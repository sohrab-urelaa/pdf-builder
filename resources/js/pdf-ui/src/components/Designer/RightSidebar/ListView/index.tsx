import { useContext, useState } from "react";
import type { SidebarProps } from "../../../../types";
import { RIGHT_SIDEBAR_WIDTH } from "../../../../constants";
import { I18nContext } from "../../../../contexts";
import { getSidebarContentHeight } from "../../../../helper";
import { theme, Input, Typography, Divider } from "antd";
import SelectableSortableContainer from "./SelectableSortableContainer";

const { Text } = Typography;
const { TextArea } = Input;

const headHeight = 40;

const ListView = (
    props: Pick<
        SidebarProps,
        | "schemas"
        | "onSortEnd"
        | "onEdit"
        | "size"
        | "hoveringSchemaId"
        | "onChangeHoveringSchemaId"
        | "changeSchemas"
    >
) => {
    const {
        schemas,
        onSortEnd,
        onEdit,
        size,
        hoveringSchemaId,
        onChangeHoveringSchemaId,
        // changeSchemas,
    } = props;
    const { token } = theme.useToken();
    const i18n = useContext(I18nContext);
    const [isBulkUpdateFieldNamesMode, _] = useState(false);
    const [fieldNamesValue, setFieldNamesValue] = useState("");
    const height = getSidebarContentHeight(size.height);

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Text strong style={{ textAlign: "center", width: "100%" }}>
                    {i18n("fieldsList")}
                </Text>
            </div>
            <Divider
                style={{
                    marginTop: token.marginXS,
                    marginBottom: token.marginXS,
                }}
            />
            <div>
                {isBulkUpdateFieldNamesMode ? (
                    <TextArea
                        wrap="off"
                        value={fieldNamesValue}
                        onChange={(e) => setFieldNamesValue(e.target.value)}
                        style={{
                            paddingLeft: 30,
                            height: height - headHeight,
                            width: RIGHT_SIDEBAR_WIDTH - 35,
                            lineHeight: "2.75rem",
                        }}
                    />
                ) : (
                    <SelectableSortableContainer
                        schemas={schemas}
                        hoveringSchemaId={hoveringSchemaId}
                        onChangeHoveringSchemaId={onChangeHoveringSchemaId}
                        onSortEnd={onSortEnd}
                        onEdit={onEdit}
                    />
                )}
            </div>
        </div>
    );
};

export default ListView;
