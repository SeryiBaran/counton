export const copyToClipboard = (text) => {
  const tempInput = document.createElement("input");
  tempInput.setAttribute("value", text);
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
};

export const navigateToWallet = (e, navigate) => {
  e.preventDefault();
    if (/^[a-zA-z0-9\-_]{48}$/.test(e.target["id-input"].value)) {
      navigate(`/balance/${e.target["id-input"].value}`, { replace: true });
    } else {
      return false
    }
  
};
