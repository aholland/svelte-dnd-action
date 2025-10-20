import js from '@eslint/js';

export default [
    // Include recommended rules
    js.configs.recommended,
    
    // Global ignores
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'cypress/**',
            'scripts/**',
            'tests/**',
            'playwright-report/**',
            '*.config.js',
            '*.json',
            '*.md',
            '.git/**',
            '.github/**',
            '.idea/**',
            '.vscode/**',
            'coverage/**',
            'typings/**'
        ]
    },
    
    // Configuration for source files
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                requestAnimationFrame: 'readonly',
                cancelAnimationFrame: 'readonly',
                CustomEvent: 'readonly',
                HTMLElement: 'readonly',
                Element: 'readonly',
                Node: 'readonly',
                NodeList: 'readonly',
                DOMRect: 'readonly',
                ResizeObserver: 'readonly',
                IntersectionObserver: 'readonly',
                ShadowRoot: 'readonly',
                HTMLDocument: 'readonly',
                PointerEvent: 'readonly',
                TouchEvent: 'readonly',
                KeyboardEvent: 'readonly',
                DragEvent: 'readonly',
                Event: 'readonly',
                getComputedStyle: 'readonly'
            }
        },
        rules: {}
    }
];