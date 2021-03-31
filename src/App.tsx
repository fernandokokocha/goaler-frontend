import { Layout } from "./layout";
import { Goals } from "./goals";
import {
  BrowserRouter as Router,
} from "react-router-dom";

export const App = () => (
  <Router>
    <Layout>
      <Goals />
    </Layout>
  </Router>
);

export default App;
