import React, { createContext, useReducer } from "react";
import { IPdfTemplateContext, initialState } from "./initialState";
import { pdfTemplateReducer } from "./PdfTemplateReducer";

interface IPdfTemplateContextState {
    data: IPdfTemplateContext;
    dispatch: any;
}

const PdfTemplateContext = createContext<IPdfTemplateContextState>({
    data: initialState,
    dispatch: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const usePdfTemplates = () => {
    return React.useContext(PdfTemplateContext);
};

export const PdfTemplateContextProvider: React.FC<Props> = ({ children }) => {
    const [templates, dispatch] = useReducer(pdfTemplateReducer, initialState);
    return (
        <PdfTemplateContext.Provider
            value={{
                data: templates,
                dispatch: dispatch,
            }}
        >
            {children}
        </PdfTemplateContext.Provider>
    );
};

export default PdfTemplateContext;
