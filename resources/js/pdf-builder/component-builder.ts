//@ts-nocheck
import TemplateBuilder from "./builder/builder.vue";
import Form from "./submission_form/form.vue";
import data from "./builder/template";
import formData from "./submission_form/data";
import DrawSignature from "./submission_form/mobile_signature.vue";
import { createApp, reactive } from "vue";
const safeRegisterElement = (name, element, options = {}) =>
    !window.customElements.get(name) &&
    window.customElements.define(name, element, options);

safeRegisterElement(
    "template-builder",
    class extends HTMLElement {
        connectedCallback() {
            this.appElem = document.createElement("div");
            this.appElem.classList.add("h-screen");
            console.log("Template", this.dataset?.template);
            this.app = createApp(TemplateBuilder, {
                template: reactive(JSON.parse(this.dataset?.template)),
                backgroundColor: this.dataset?.background || "#faf7f5",
                withPayment: true,
                isPaymentConnected: false,
                acceptFileTypes: this.dataset.acceptFileTypes,
            });

            this.app.mount(this.appElem);

            this.appendChild(this.appElem);
        }

        disconnectedCallback() {
            this.app?.unmount();
            this.appElem?.remove();
        }
    }
);

safeRegisterElement(
    "submission-form",
    class extends HTMLElement {
        connectedCallback() {
            this.appElem = document.createElement("div");

            this.app = createApp(Form, {
                template: JSON.parse(this.dataset.template),
                submitter: JSON.parse(this.dataset.submitter),
                values: reactive(JSON.parse(this.dataset.values)),
                withQrButton: true,
                fields: JSON.parse(this.dataset.fields),
                attachments: reactive(this.dataset?.attachments || []),
            });

            this.app.mount(this.appElem);

            this.appendChild(this.appElem);
        }

        disconnectedCallback() {
            this.app?.unmount();
            this.appElem?.remove();
        }
    }
);
// safeRegisterElement(
//     "template-builder",
//     class extends HTMLElement {
//         templateData = localStorage.getItem("template")
//             ? JSON.parse(localStorage.getItem("template"))
//             : data.template;

//         // templateData = data;
//         connectedCallback() {
//             console.log("Template", this.templateData);
//             this.appElem = document.createElement("div");

//             this.appElem.classList.add("md:h-screen");
//             this.app = createApp(TemplateBuilder, {
//                 template: reactive(this.templateData),
//                 backgroundColor: "#faf7f5",
//             });

//             this.app.mount(this.appElem);

//             this.appendChild(this.appElem);
//         }

//         disconnectedCallback() {
//             this.app?.unmount();
//             this.appElem?.remove();
//         }
//     }
// );

// safeRegisterElement(
//     "submission-form",
//     class extends HTMLElement {
//         formData = formData;
//         templateData = localStorage.getItem("template")
//             ? JSON.parse(localStorage.getItem("template"))
//             : data.template;
//         connectedCallback() {
//             this.appElem = document.createElement("div");

//             this.app = createApp(Form, {
//                 template: JSON.parse(this.dataset.template),
//                 submitter: JSON.parse(this.dataset.submitter),
//                 values: reactive(JSON.parse(this.dataset.values)),
//                 withQrButton: true,
//                 fields: JSON.parse(this.dataset.fields),

//                 // template: this.templateData,
//                 // submitter: this.templateData.submitters[0],
//                 // canSendEmail: formData.canSendEmail === "true",
//                 // previousSignatureValue: formData.previousSignatureValue,
//                 // goToLast: formData.goToLast === "true",
//                 // isDemo: formData.isDemo === "true",
//                 // attribution: formData.attribution !== "false",
//                 // scrollPadding: formData.scrollPadding || "-80px",
//                 // dryRun: false,
//                 // expand: ["true", "false"].includes(this.dataset.expand)
//                 //     ? formData.expand === "true"
//                 //     : null,
//                 // withSignatureId: formData.withSignatureId === "true",
//                 // withConfetti: formData.withConfetti !== "false",
//                 // withDisclosure: formData.withDisclosure === "true",
//                 // withTypedSignature: formData.withTypedSignature !== "false",
//                 // authenticityToken: document.querySelector(
//                 //     'meta[name="csrf-token"]'
//                 // )?.content,
//                 rememberSignature: formData.rememberSignature === "true",
//                 // values: reactive(formData.values),
//                 completedButton: formData.completedButton || {},
//                 // withQrButton: true,
//                 completedMessage: formData.completedMessage || {},
//                 completedRedirectUrl: formData.completedRedirectUrl,
//                 attachments: reactive([]),
//                 // fields: this.templateData.fields,
//             });

//             this.app.mount(this.appElem);

//             this.appendChild(this.appElem);
//         }

//         disconnectedCallback() {
//             this.app?.unmount();
//             this.appElem?.remove();
//         }
//     }
// );

safeRegisterElement(
    "draw-signature",
    class extends HTMLElement {
        field = {
            name: "",
            uuid: "3ee2b95f-d95e-4d23-9e11-eb3019f430ed",
            submitter_uuid: "2c3038bd-82be-4024-beed-f55d246f4c69",
            required: true,
            type: "text",
            areas: [
                {
                    x: 0.608780487804878,
                    y: 0.06231884057971015,
                    page: 0,
                    attachment_uuid: "sohrab.dev.pdf_1722611243330",
                    w: 0.2,
                    h: 0.02857142857142857,
                },
            ],
            preferences: {},
        };
        connectedCallback() {
            this.appElem = document.createElement("div");

            this.app = createApp(DrawSignature, {
                field: this.field,
            });

            this.app.mount(this.appElem);

            this.appendChild(this.appElem);
        }

        disconnectedCallback() {
            this.app?.unmount();
            this.appElem?.remove();
        }
    }
);
