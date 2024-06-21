import { IPdfTemplateContext } from "./initialState";

export enum PdfTemplateActions {
    UPDATE_PDF = "UPDATE_PDF",
    UPDATE_TEMPLATES = "UPDATE_TEMPLATES",
}

export const pdfTemplateReducer = (
    state: IPdfTemplateContext,
    action: { type: PdfTemplateActions; payload: any }
): IPdfTemplateContext => {
    switch (action.type) {
        case PdfTemplateActions.UPDATE_PDF: {
            return state;
        }
        case PdfTemplateActions.UPDATE_TEMPLATES: {
            const { templates, inputs } = action.payload;

            const updatedSchemas = templates.schemas.map(
                (parentSchema: any, index: number) => {
                    const updatedSchema: any = {};
                    Object.keys(parentSchema).forEach((schemaKey) => {
                        const mainSchema = parentSchema[schemaKey];
                        if (!updatedSchema[schemaKey]) {
                            updatedSchema[schemaKey] = null;
                        }
                        updatedSchema[schemaKey] = mainSchema;
                        if (mainSchema.type === "text") {
                            updatedSchema[schemaKey].content =
                                inputs[index][schemaKey];
                        }
                    });
                    return updatedSchema;
                }
            );
            const currentPdfTemplate = {
                ...state.templates[state.currentTemplate].template,
            };

            const updatedTemplate = {
                ...currentPdfTemplate,
                basePdf: templates.basePdf,
                schemas: updatedSchemas,
            };
            return {
                ...state,
                templates: {
                    ...state.templates,
                    [state.currentTemplate]: {
                        ...state.templates[state.currentTemplate],
                        template: updatedTemplate,
                    },
                },
            };
        }
        default: {
            return state;
        }
    }
};
