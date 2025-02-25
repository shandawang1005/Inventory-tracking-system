import { createRoot } from "react-dom/client"; // ✅ 这样才是正确的
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement); // ✅ 这样不会报错
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
