import {z} from "zod";
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (issue.received === "undefined") {
        return { message: "Es requerido" };
      }
      if (issue.received === "null") {
        return { message: "No puede ser nulo" };
      }
      if (issue.expected === "string") {
        return { message: "Debe ser una cadena de texto" };
      }
      if (issue.expected === "number") {
        return { message: "Debe ser un numero" };
      }
      if (issue.expected === "date") {
        return { message: "Debe ser una fecha" };
      }
    }
    if (issue.code === z.ZodIssueCode.invalid_string) {
      if (issue.validation === "email") {
        return { message: "El formato no es correcto, debe ser un email" };
      }
      return { message: "El formato no es correcto" };
    }
    if (issue.code === z.ZodIssueCode.too_small) {
      return { message: `debe ser mayor que ${issue.minimum}` };
    }
    if (issue.code === z.ZodIssueCode.custom) {
      return { message: `menor-que-${(issue.params || {}).minimum}` };
    }
    return { message: ctx.defaultError };
  };

  export const zodErrorMap = customErrorMap;