import { isValidElement } from "react";
const isDevelopment = process.env.NODE_ENV === "development";

export interface ValidateControlOptions {
  validTypes: Array<string | Function>;
  allowedNames?: string[];
  validExample?: string;
  componentName?: string;
}

export function validateControl(
  control: any,
  options: ValidateControlOptions,
): boolean {
  const {
    validTypes,
    allowedNames = [],
    validExample = "<FormControlLabel control={<Component />} label='Label Text' />",
    componentName = "Component",
  } = options;

  function getType(value: any): string {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (typeof value === "object") return "object";
    return typeof value;
  }
  if (!isValidElement(control)) {
    const receivedType = getType(control);

    const messages: Record<string, string> = {
      undefined: `'control' attribute is missing or undefined. A valid React element is required.`,
      null: `'control' is null. A valid React element is required.`,
      object: `You provided an invalid object as 'control'. Expected a React component or <input>.`,
      string: `You provided a string as 'control': "${control}". A valid React element is required.`,
      number: `You provided a number as 'control': ${control}. A valid React element is required.`,
    };

    const errorMessage =
      messages[receivedType] ||
      `You provided an invalid type as 'control': ${receivedType}. A valid React element is required.`;

    logError(errorMessage, {
      receivedType,
      allowedTypes: validTypes.map((t) =>
        typeof t === "string" ? t : (t as any).name || "unknown",
      ),
      validExample,
      componentName,
    });

    return false;
  }
  const type = control.type;

  // 🔹 HTML input tag
  if (typeof type === "string") {
    if (type === "input") {
      const props = control.props as { type?: string };
      const inputType = props.type || "";

      if (!validTypes.includes(inputType)) {
        logError(
          `You provided an invalid input type: <input type="${inputType}" />. Only '${validTypes.join(
            "', '",
          )}' are allowed.`,
          {
            receivedType: inputType,
            allowedTypes: validTypes,
            validExample,
            componentName,
          },
        );
        return false;
      }
    } else {
      logError(
        `You provided an invalid type: ${type}. Only '${validTypes.join(
          "', '",
        )}' are allowed.`,
        {
          receivedType: type,
          allowedTypes: validTypes,
          validExample,
          componentName,
        },
      );
      return false;
    }
  }

  // 🔹 Custom component (React Component)
  if (typeof type === "function") {
    const displayName = (type as any)?.displayName || (type as any).name;
    if (!allowedNames.includes(displayName)) {
      logError(
        `You provided an unsupported component: ${displayName}. Only ${allowedNames.join(
          ", ",
        )} are allowed.`,
        {
          receivedType: displayName,
          allowedTypes: allowedNames,
          validExample,
          componentName,
        },
      );
      return false;
    }
  }

  return true;
}

// 🎨 Console logger
function logError(message: string, meta: Record<string, any> = {}) {
  if (!isDevelopment) return;

  const name = meta.componentName || "Component";

  console.groupCollapsed(`${name} Error`);

  console.log(
    `%c${message}`,
    "color: white; background-color: #d32f2f; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
  );

  console.group("Error Details");

  if (meta.receivedType !== undefined) {
    console.log(
      `%creceivedType:`,
      "color: #fff; background-color: #ef5350; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
      meta.receivedType,
    );
  }

  if (meta.allowedTypes !== undefined) {
    console.log(
      `%callowedTypes:`,
      "color: #fff; background-color: #9810fa; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
      meta.allowedTypes.join(", "),
    );
  }

  if (meta.validExample !== undefined) {
    console.log(
      `%cvalidExample:`,
      "color: #fff; background-color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
      meta.validExample,
    );
  }

  console.groupEnd();
  console.groupEnd();
}
