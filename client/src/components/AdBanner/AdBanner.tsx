import { useEffect } from "react";

const AdBanner = () => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
    } catch (e) {
      console.error("Błąd ładowania reklamy", e);
    }
  }, []);

  return (
    <div
      className="w-100 text-center my-2"
      style={{ minHeight: "50px", overflow: "hidden" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "400px", height: "90px" }}
        data-ad-client="ca-pub-7477703058288213"
        data-ad-slot="9238272326"
      ></ins>
      {/* <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-TWOJ-UNIKALNY-IDENTYFIKATOR"
        data-ad-slot="NUMER-Z-PANELU-GOOGLE"
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      ></ins> */}
    </div>
  );
};

export default AdBanner;
