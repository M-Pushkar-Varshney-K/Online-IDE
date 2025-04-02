import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({ onChange }: { onChange: (value: string | null) => void }) => {
    return (
        <div>
            <ReCAPTCHA
                sitekey="6LdNvMcqAAAAALrv9NRDTxLm-Bty1DoRszDn43Yy"
                onChange={onChange}
            />
        </div>
    );
};

export default Captcha;
