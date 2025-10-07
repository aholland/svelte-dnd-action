<script>
    import {dragHandleZone, dragHandle} from "../../src/index.js";
    import {flip} from "svelte/animate";

    let items = [
        {id: 1, name: "Item 1"},
        {id: 2, name: "Item 2"},
        {id: 3, name: "Item 3"},
        {id: 4, name: "Item 4"},
        {id: 5, name: "Item 5"}
    ];

    function handleConsider(e) {
        items = e.detail.items;
    }

    function handleFinalize(e) {
        items = e.detail.items;
    }
</script>

<div class="container">
    <h1>Drag Handle Test</h1>
    <p class="instruction">Items can only be dragged by their handles (☰)</p>

    <section
        use:dragHandleZone={{items, flipDurationMs: 200}}
        onconsider={handleConsider}
        onfinalize={handleFinalize}
        class="dnd-list"
        data-testid="handle-zone"
    >
        {#each items as item (item.id)}
            <div class="item" animate:flip={{duration: 200}} data-testid="item-{item.id}">
                <span class="drag-handle" use:dragHandle data-testid="handle-{item.id}">☰</span>
                <span class="item-content">{item.name}</span>
                <span class="no-drag-area" data-testid="no-drag-{item.id}">📄</span>
            </div>
        {/each}
    </section>

    <div class="order-display" data-testid="order-display">
        Current order: {items.map(i => i.id).join(", ")}
    </div>
</div>

<style>
    .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        font-family: system-ui, -apple-system, sans-serif;
    }

    h1 {
        text-align: center;
        margin-bottom: 10px;
    }

    .instruction {
        text-align: center;
        color: #666;
        font-size: 14px;
        margin-bottom: 30px;
    }

    .dnd-list {
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        min-height: 300px;
        background: #f9f9f9;
    }

    .item {
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 15px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        user-select: none;
        transition: box-shadow 0.2s;
    }

    .item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .drag-handle {
        font-size: 20px;
        color: #999;
        padding: 5px;
        /* cursor is managed by the dragHandle action */
    }

    .item-content {
        flex: 1;
        cursor: default;
    }

    .no-drag-area {
        font-size: 18px;
        cursor: default;
        padding: 5px;
    }

    .order-display {
        margin-top: 20px;
        padding: 15px;
        background: #e3f2fd;
        border-radius: 4px;
        text-align: center;
        font-weight: 500;
    }
</style>
