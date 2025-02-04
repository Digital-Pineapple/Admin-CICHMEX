export function redirectTo(url) {
    const newWindow = window.open(
      url,
      "_blank"
    );
    newWindow.focus();
}