import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import checkFile from 'eslint-plugin-check-file'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}', 'src/components/data-table.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      'check-file': checkFile,
    },
    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          'src/**/': 'KEBAB_CASE',
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/app/routes/**/*.{ts,tsx}': 'PASCAL_CASE',
          'src/app/App*.tsx': 'PASCAL_CASE',
          'src/components/layouts/*.{ts,tsx}': 'PASCAL_CASE',
          'src/components/ui/*.{ts,tsx}': 'KEBAB_CASE',
          'src/features/**/components/*.{ts,tsx}': 'KEBAB_CASE',
          'src/{hooks,lib,types,utils}/**/*.{ts,tsx}': 'KEBAB_CASE',
        },
      ],
    },
  },
])
