import Inputmask from "inputmask";
import fancybox from "@fancyapps/fancybox";

let forms = {
    init: function () {
        forms.app = this;

        this.document.ready(() => {
            forms.initMask();
            forms.initForm();
        });
    },

    initMask() {
        let selector = document.querySelectorAll(".mask-validate");
        Inputmask({
            mask: "+7 (999) 999 99 99",
            showMaskOnHover: false,
        }).mask(selector);
    },

    initForm() {
        const form = document.getElementById("form");
        form.addEventListener("submit", formSend);

        async function formSend(e) {
            e.preventDefault();
            console.log(form);
            let error = formValidate(form);
            let formData = new FormData(form);
            for (let i = 0; i < formDocItemArray.length; i++) {
                formData.append("doc", formDocItemArray[i]);
            }

            if (error === 0) {
                form.classList.add("_sending");
                let response = await fetch("sendmail.php", {
                    method: "POST",
                    body: formData,
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    form.reset();
                    form.classList.remove("_sending");
                } else {
                    alert("ошибка 11");
                    form.classList.remove("_sending");
                }
            } else {
                alert("Можно сделать например popup");
            }
        }
        function formValidate(form) {
            let error = 0;
            const formReq = document.querySelectorAll("._req");
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
                console.log("11");
                if (input.classList.contains("._email")) {
                    if (emailTestValid(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if (
                    input.getAttribute("type") === "checkbox" &&
                    input.checked === false
                ) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === "") {
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add("_error");
            input.classList.add("_error");
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove("_error");
            input.classList.remove("_error");
        }
        function emailTestValid(input) {
            return new System.ComponentModel.DataAnnotations.EmailAddressAttribute().IsValid(
                input
            );
        }
        const formDoc = document.getElementById("formDoc");
        const formPreview = document.getElementById("formPreview");
        const formDocItemArray = [];
        formDoc.addEventListener("change", readmultifiles);
        function readmultifiles() {
            const files = this.files;
            for (let file of files) {
                if (
                    ![
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ].includes(file.type)
                ) {
                    alert("Разрешены только файлы формата doc");
                    formDoc.value = "";
                    return;
                }
                const reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.fileName = file.name;
                reader.onload = (event) => {
                    const fileName = event.target.fileName;
                    const content = event.currentTarget.result;
                    // console.log({ fileName, content });
                    formDocItemArray.push(content);
                    createPreviewItem(fileName);
                    console.log("change", formDocItemArray);
                };
            }
        }

        function createPreviewItem(name) {
            let previewItem = document.createElement("li");
            let previewItemSpan = document.createElement("span");
            let previewItemButton = document.createElement("button");
            previewItemButton.type = "button";
            previewItemSpan.innerHTML = `${name}`;
            previewItem.classList.add("formPreview_item");
            previewItemButton.classList.add("prewiew_item_button");
            previewItem.append(previewItemSpan);
            previewItem.append(previewItemButton);
            formPreview.append(previewItem);

            previewItemButton.addEventListener("click", (e) => {
                const previewItem = e.target.parentElement;
                const indexDeleteElement = Array.from(
                    formPreview.children
                ).indexOf(previewItem);
                formDocItemArray.splice(indexDeleteElement, 1);
                previewItem.parentNode.removeChild(previewItem);
                console.log(formDocItemArray);
            });
        }
        const inputFormItems = document.querySelectorAll(".form_input");
        inputFormItems.forEach((item) => {
            item.addEventListener("input", () => {
                if (item.value !== "") {
                    item.closest(".form_item").classList.add("active");
                }
            });
        });
    },
};

export default forms;
