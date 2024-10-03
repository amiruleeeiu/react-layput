// scripts/create-component.js (or create-component.mjs if using ES modules)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Retrieve the full path and component name from command-line arguments
const fullPath = process.argv[2];

if (!fullPath) {
  console.error("Please provide the component path (e.g., ui/TestButton).");
  process.exit(1);
}

// Split the fullPath into segments
const pathSegments = fullPath.split("/");
const componentName = pathSegments.pop(); // Last segment is the component name
const folderPath = pathSegments.join("/"); // Remaining segments form the folder path

// Validate the component name and folder path
const validNameRegex = /^[A-Za-z][A-Za-z0-9_]*$/;

for (const segment of [...pathSegments, componentName]) {
  if (!validNameRegex.test(segment)) {
    console.error(
      `Invalid folder or component name: "${segment}". Use alphanumeric characters and underscores only.`
    );
    process.exit(1);
  }
}

// Full path for the component
const componentDir = path.join(
  __dirname,
  "..",
  "src",
  "components",
  folderPath,
  componentName
);

// Check if the component already exists
if (fs.existsSync(componentDir)) {
  console.error(
    `Component "${componentName}" already exists at "${path.join(
      "src",
      "components",
      folderPath,
      componentName
    )}".`
  );
  process.exit(1);
}

// Create the component directory
fs.mkdirSync(componentDir, { recursive: true });

// Define the component template without CSS import
const componentTemplate = `

export interface ${componentName}Props {
  // Define your props here
}

const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
};

export default ${componentName};
`;

// Define the Storybook story template
const storyTemplate = `
import { Meta, StoryFn } from '@storybook/react';
import ${componentName}, { ${componentName}Props } from './${componentName}';

export default {
  title: 'Components/${folderPath ? folderPath + "/" : ""}${componentName}',
  component: ${componentName},
} as Meta;

const Template: StoryFn<${componentName}Props> = (args) => <${componentName} {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Default props
};
`;

// Write the component file
fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentTemplate
);

// Write the Storybook story file
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.tsx`),
  storyTemplate
);

console.log(
  `Component "${componentName}" and its Storybook story have been created successfully in "${path.join(
    "src",
    "components",
    folderPath,
    componentName
  )}".`
);


// command npm run create:component ui/Button
