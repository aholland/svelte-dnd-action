import {mount} from "svelte";
import HandleApp from "./HandleApp.svelte";

const app = mount(HandleApp, {
    target: document.getElementById("app")
});

export default app;
