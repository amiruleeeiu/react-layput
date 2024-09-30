import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

// Generic TableColumn Interface
interface TableColumn<T> {
  label: string;
  accessor: keyof T;
}

// Updated TableProps Interface with Generic Type
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  caption?: string;
  actions?: {
    edit?: {
      label?: string;
      icon?: React.ReactElement;
      onClick: (row: T) => void;
    };
    delete?: {
      label?: string;
      icon?: React.ReactElement;
      onClick: (row: T) => void;
    };
    view?: {
      label?: string;
      icon?: React.ReactElement;
      onClick: (row: T) => void;
    };
  };
}

// Generic DataTable Component
const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  actions,
}: TableProps<T>) => {
  if (!columns || !data) {
    throw new Error("DataTable requires columns and data props");
  }

  // Determine if the current screen is mobile
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {isMobile ? (
        // Card Layout for Mobile Devices
        <Stack spacing={3}>
          {data.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              boxShadow="sm"
            >
              <Stack spacing={2}>
                {columns.map((column, columnIndex) => (
                  <Flex key={columnIndex} justify="space-between">
                    <Text fontWeight="bold" mr={2}>
                      {column.label}:
                    </Text>
                    <Text textAlign="right" flex="1">
                      {row[column.accessor] !== undefined
                        ? String(row[column.accessor])
                        : ""}
                    </Text>
                  </Flex>
                ))}
                {actions && (
                  <Flex mt={2} justify="flex-end">
                    {actions.edit && (
                      <Tooltip label={actions.edit.label || "Edit"}>
                        <IconButton
                          aria-label="Edit"
                          icon={actions.edit.icon || <EditIcon />}
                          size="sm"
                          onClick={() => actions.edit?.onClick(row)}
                          mr={2}
                        />
                      </Tooltip>
                    )}
                    {actions.delete && (
                      <Tooltip label={actions.delete.label || "Delete"}>
                        <IconButton
                          aria-label="Delete"
                          icon={actions.delete.icon || <DeleteIcon />}
                          size="sm"
                          onClick={() => actions.delete?.onClick(row)}
                          mr={2}
                        />
                      </Tooltip>
                    )}
                    {actions.view && (
                      <Tooltip label={actions.view.label || "View"}>
                        <IconButton
                          aria-label="View"
                          icon={actions.view.icon || <ViewIcon />}
                          size="sm"
                          onClick={() => actions.view?.onClick(row)}
                        />
                      </Tooltip>
                    )}
                  </Flex>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      ) : (
        // Table Layout for Larger Screens
        <TableContainer>
          <Table variant="simple">
            {/* Optional Caption */}
            {/* <caption>{caption}</caption> */}
            <Thead>
              <Tr>
                {columns.map((column, index) => (
                  <Th key={index}>{column.label}</Th>
                ))}
                {actions && <Th key="actions">Actions</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, rowIndex) => (
                <Tr key={rowIndex}>
                  {columns.map((column, columnIndex) => (
                    <Td key={columnIndex}>
                      {row[column.accessor] !== undefined
                        ? String(row[column.accessor])
                        : ""}
                    </Td>
                  ))}
                  {actions && (
                    <Td key="actions">
                      {(actions.edit || actions.delete || actions.view) && (
                        <>
                          {actions.edit && (
                            <Tooltip label={actions.edit.label || "Edit"}>
                              <IconButton
                                aria-label="Edit"
                                icon={actions.edit.icon || <EditIcon />}
                                size="sm"
                                onClick={() => actions.edit?.onClick(row)}
                                mr={2} // Adds margin for spacing
                              />
                            </Tooltip>
                          )}
                          {actions.delete && (
                            <Tooltip label={actions.delete.label || "Delete"}>
                              <IconButton
                                aria-label="Delete"
                                icon={actions.delete.icon || <DeleteIcon />}
                                size="sm"
                                onClick={() => actions.delete?.onClick(row)}
                                mr={2}
                              />
                            </Tooltip>
                          )}
                          {actions.view && (
                            <Tooltip label={actions.view.label || "View"}>
                              <IconButton
                                aria-label="View"
                                icon={actions.view.icon || <ViewIcon />}
                                size="sm"
                                onClick={() => actions.view?.onClick(row)}
                              />
                            </Tooltip>
                          )}
                        </>
                      )}
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default DataTable;
