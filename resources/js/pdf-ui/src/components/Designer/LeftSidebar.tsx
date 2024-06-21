import React, { useContext } from "react";
import { Schema, Plugin, BasePdf } from "@pdfme/common";
import { theme } from "antd";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Renderer from "../Renderer";
import { PluginsRegistry } from "../../contexts";

const Draggable = (props: {
    plugin: Plugin<any>;
    scale: number;
    basePdf: BasePdf;
    children: React.ReactNode;
}) => {
    const { scale, basePdf, plugin } = props;
    const { token } = theme.useToken();
    const defaultSchema = plugin.propPanel.defaultSchema as Schema;
    const draggable = useDraggable({
        id: defaultSchema.type,
        data: defaultSchema,
    });
    const { listeners, setNodeRef, attributes, transform, isDragging } =
        draggable;
    const style = { transform: CSS.Translate.toString(transform) };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {isDragging && (
                <div style={{ transform: `scale(${scale})` }}>
                    <Renderer
                        key={defaultSchema.type}
                        schema={{
                            ...defaultSchema,
                            id: defaultSchema.type,
                            key: defaultSchema.type,
                        }}
                        basePdf={basePdf}
                        value={defaultSchema.content || ""}
                        onChangeHoveringSchemaId={() => {
                            void 0;
                        }}
                        mode={"viewer"}
                        outline={`1px solid ${token.colorPrimary}`}
                        scale={scale}
                    />
                </div>
            )}
            <div style={{ visibility: isDragging ? "hidden" : "visible" }}>
                {props.children}
            </div>
        </div>
    );
};

const LeftSidebar = ({
    scale,
    basePdf,
}: {
    height: number;
    scale: number;
    basePdf: BasePdf;
}) => {
    const { token } = theme.useToken();
    const pluginsRegistry = useContext(PluginsRegistry);

    return (
        <div
            style={{
                left: 0,
                position: "absolute",
                right: 0,
                zIndex: 5,
                // height,
                background: token.colorBgLayout,
                textAlign: "center",
            }}
            className="w-full flex gap-3 flex-wrap p-2"
        >
            {Object.entries(pluginsRegistry).map(([label, plugin]) => {
                if (!plugin?.propPanel.defaultSchema) return null;
                return (
                    <Draggable
                        key={label}
                        scale={scale}
                        basePdf={basePdf}
                        plugin={plugin}
                    >
                        <div className="flex border-2 cursor-pointer border-slate-200 rounded-md p-3 gap-2 items-center justify-center h-[100px] w-[100px]">
                            <div className="flex flex-col items-center">
                                {plugin.propPanel.defaultSchema.icon ? (
                                    <>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: plugin.propPanel
                                                    .defaultSchema.icon,
                                            }}
                                        />
                                        <p className="overflow-hidden text-ellipsis w-[70%]">
                                            {label}
                                        </p>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {label}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Draggable>
                );
            })}
        </div>
    );
};

export default LeftSidebar;
