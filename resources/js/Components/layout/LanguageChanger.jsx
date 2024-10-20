import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageChanger = () => {
    const [selectedLang, setSelectedLang] = useState(
        localStorage.getItem("i18nextLng")
    );
    const [isOpenLangDropdown, setIsOpenLangDropDown] = useState(false);

    const [langList, setLangList] = useState(window.SUPPORTED_LANGUAGES);
    const { i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        setSelectedLang(language?.country_code);
        setIsOpenLangDropDown(false);
        i18n.changeLanguage(language?.country_code);

        localStorage.setItem("isRTL", language?.rtl?.toString());
        if (language?.rtl === 1) {
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.documentElement.removeAttribute("dir");
        }
    };
    return (
        <div
            className={`dropdown dropdown-end ${
                isOpenLangDropdown ? " dropdown-open" : ""
            }`}
        >
            <div
                onClick={() => setIsOpenLangDropDown((prev) => !prev)}
                tabIndex={0}
                role="button"
                className="btn m-1"
            >
                {selectedLang}
            </div>

            {isOpenLangDropdown && (
                <ul
                    tabIndex={0}
                    className=" dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                    {langList?.map((language) => {
                        return (
                            <li
                                onClick={() => handleChangeLanguage(language)}
                                key={language?.country_name}
                            >
                                <a>{language?.country_name}</a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default LanguageChanger;
