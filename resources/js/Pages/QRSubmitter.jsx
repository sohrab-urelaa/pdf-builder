import "../pdf-builder/component-builder";
const QRSubmitter = () => {
    return (
        <div>
            <div
                dangerouslySetInnerHTML={{
                    __html: `
          <draw-signature></draw-signature>
        `,
                }}
            ></div>
        </div>
    );
};

export default QRSubmitter;
