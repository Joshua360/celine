import { useEffect } from "react";

export default function Support() {

  useEffect(() => {
    // Load Tawk.to script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/69271b5606a1b2195f2eeaf4/1jb0c5irf"; // ← INSERT YOUR TAWK URL
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      // Cleanup when leaving the page
      const tawkFrame = document.querySelector("iframe[src*='tawk.to']");
      if (tawkFrame) tawkFrame.remove();
      script.remove();
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">

      <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>

      <p className="text-gray-700 leading-relaxed">
        Need help? We’re here for you.  
        Our support team is available and responds as quickly as possible.
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">How to Contact Support</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Use the live chat widget at the bottom-right of your screen.</li>
          <li>Describe your issue clearly — more details help us assist you faster.</li>
          <li>You can send messages anytime, even when we’re offline.</li>
          <li>We will get back to you as soon as possible.</li>
          <li>Responses are typically very fast, especially during business hours.</li>
        </ul>
      </div>

      <p className="text-gray-700">
        Once the chat widget loads, simply click the chat button and start typing.
        If the widget does not appear, please refresh the page.
      </p>

      <p className="text-gray-500 text-sm italic">
        Your satisfaction is our priority — we’re always ready to help.
      </p>

    </div>
  );
}
