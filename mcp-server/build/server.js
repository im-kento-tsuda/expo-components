import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { components, getComponentById, getComponentsByCategory, searchComponents, } from "./data/components.js";
export async function createServer() {
    const server = new McpServer({
        name: "expo-components",
        version: "1.0.0",
    });
    // Register static resource for component list
    server.resource("component-list", "component://list", {
        description: "List of all available components",
        mimeType: "application/json",
    }, async (uri) => {
        const list = components.map((comp) => ({
            id: comp.id,
            name: comp.name,
            description: comp.description,
            category: comp.category,
        }));
        return {
            contents: [
                {
                    uri: uri.href,
                    mimeType: "application/json",
                    text: JSON.stringify(list, null, 2),
                },
            ],
        };
    });
    // Dynamic resource for individual components using ResourceTemplate
    const componentTemplate = new ResourceTemplate("component://{id}", {
        list: async () => {
            return {
                resources: components.map((comp) => ({
                    uri: `component://${comp.id}`,
                    name: comp.name,
                    description: comp.description,
                    mimeType: "application/json",
                })),
            };
        },
    });
    server.resource("component-detail", componentTemplate, {
        description: "Get detailed information about a specific component",
        mimeType: "application/json",
    }, async (uri, variables) => {
        const id = variables.id;
        const component = getComponentById(id);
        if (!component) {
            return {
                contents: [
                    {
                        uri: uri.href,
                        mimeType: "application/json",
                        text: JSON.stringify({ error: `Component '${id}' not found` }),
                    },
                ],
            };
        }
        return {
            contents: [
                {
                    uri: uri.href,
                    mimeType: "application/json",
                    text: JSON.stringify(component, null, 2),
                },
            ],
        };
    });
    // Tool: list_components
    server.tool("list_components", "Get a list of all available expo-components. Optionally filter by category.", {
        category: z
            .enum([
            "form-inputs",
            "layout",
            "data-display",
            "feedback",
            "navigation",
        ])
            .optional()
            .describe("Filter by category: form-inputs, layout, data-display, feedback, navigation"),
    }, async ({ category }) => {
        const list = category
            ? getComponentsByCategory(category)
            : components;
        const result = list.map((comp) => ({
            id: comp.id,
            name: comp.name,
            description: comp.description,
            category: comp.category,
            import: comp.importStatement,
        }));
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    });
    // Tool: get_component
    server.tool("get_component", "Get detailed information about a specific component including props, examples, and usage notes.", {
        name: z.string().describe("The component name or id (e.g., 'button', 'card')"),
    }, async ({ name }) => {
        const component = getComponentById(name.toLowerCase());
        if (!component) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Component '${name}' not found. Use list_components to see available components.`,
                    },
                ],
                isError: true,
            };
        }
        // Format output in a readable way
        let output = `# ${component.name}\n\n`;
        output += `${component.description}\n\n`;
        output += `## Import\n\n\`\`\`typescript\n${component.importStatement}\n\`\`\`\n\n`;
        if (component.subComponents && component.subComponents.length > 0) {
            output += `## Sub Components\n\n`;
            output += component.subComponents.map((s) => `- ${s}`).join("\n");
            output += "\n\n";
        }
        output += `## Props\n\n`;
        output += `| Name | Type | Required | Default | Description |\n`;
        output += `|------|------|----------|---------|-------------|\n`;
        for (const prop of component.props) {
            output += `| ${prop.name} | \`${prop.type}\` | ${prop.required ? "Yes" : "No"} | ${prop.defaultValue ?? "-"} | ${prop.description} |\n`;
        }
        output += "\n";
        output += `## Examples\n\n`;
        for (const example of component.examples) {
            output += `### ${example.title}\n\n`;
            if (example.description) {
                output += `${example.description}\n\n`;
            }
            output += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
        }
        if (component.notes && component.notes.length > 0) {
            output += `## Notes\n\n`;
            output += component.notes.map((n) => `- ${n}`).join("\n");
            output += "\n";
        }
        return {
            content: [
                {
                    type: "text",
                    text: output,
                },
            ],
        };
    });
    // Tool: search_components
    server.tool("search_components", "Search for components by keyword. Searches in name, description, and props.", {
        query: z.string().describe("Search query keyword"),
    }, async ({ query }) => {
        const results = searchComponents(query);
        if (results.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: `No components found matching '${query}'.`,
                    },
                ],
            };
        }
        const output = results.map((comp) => ({
            id: comp.id,
            name: comp.name,
            description: comp.description,
            category: comp.category,
            import: comp.importStatement,
        }));
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(output, null, 2),
                },
            ],
        };
    });
    // Connect to transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    return server;
}
//# sourceMappingURL=server.js.map