import { ExpressionJson } from './types/json';

export interface JsonObject {
    [key: string]: JsonValue;
}
export type JsonValue = null | string | number | boolean | JsonObject | JsonValue[];

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export interface Size {
    width: number;
    height: number;
}
export interface IteratorSize extends Size {
    offsetTop: number;
    offsetLeft: number;
}

export type SchemaId = string & { readonly __schemaId: never };

export type InputValue = InputSchemaValue | undefined;
export type InputSchemaValue = string | number;
export interface InputOption {
    option: string;
    value: InputSchemaValue;
    type?: ExpressionJson;
}
export type InputKind =
    | 'number'
    | 'slider'
    | 'dropdown'
    | 'text'
    | 'text-line'
    | 'directory'
    | 'file'
    | 'generic';
export type FileInputKind = 'image' | 'pth' | 'pt' | 'video' | 'bin' | 'param' | 'onnx';
export interface Input {
    readonly id: number;
    readonly type: ExpressionJson;
    readonly kind: InputKind;
    readonly label: string;
    readonly optional: boolean;
    readonly hasHandle: boolean;
    readonly def?: InputSchemaValue;
    readonly default?: InputSchemaValue;
    readonly options?: InputOption[];
    readonly fileKind?: FileInputKind;
    readonly filetypes?: string[];
}
export interface Output {
    readonly id: number;
    readonly type: ExpressionJson;
    readonly label: string;
}

export type InputData = Readonly<Record<number, InputValue>>;

export interface NodeSchema {
    readonly name: string;
    readonly category: string;
    readonly subcategory: string;
    readonly description: string;
    readonly icon: string;
    readonly nodeType: string;
    readonly inputs: Input[];
    readonly outputs: Output[];
    readonly defaultNodes?: DefaultNode[];
    readonly schemaId: SchemaId;
    readonly hasSideEffects: boolean;
}

export interface DefaultNode {
    // Default nodes aren't currently used
    __SPECIAL: never;
    schemaId: SchemaId;
}

export interface NodeData {
    readonly id: string;
    readonly parentNode?: string;
    readonly schemaId: SchemaId;
    readonly isDisabled?: boolean;
    readonly isLocked?: boolean;
    readonly inputData: InputData;
    readonly invalid?: boolean;
    readonly iteratorSize?: IteratorSize;
    readonly percentComplete?: number;
    readonly maxWidth?: number;
    readonly maxHeight?: number;
    readonly animated?: boolean;
}
export interface EdgeData {
    readonly complete?: boolean;
}

export interface PythonInfo {
    python: string;
    version: string;
}

export type FileSaveResult = FileSaveSuccess | FileSaveCanceled;
export type FileSaveCanceled = { kind: 'Canceled' };
export type FileSaveSuccess = { kind: 'Success'; path: string };

export type FileOpenResult<T> = FileOpenSuccess<T> | FileOpenError;
export interface FileOpenSuccess<T> {
    kind: 'Success';
    path: string;
    saveData: T;
}
export interface FileOpenError {
    kind: 'Error';
    path: string;
    error: string;
}

export interface EdgeHandle {
    id: string;
    index: number;
}
export interface UsableData {
    id: string;
    schemaId: SchemaId;
    inputs: (InputValue | EdgeHandle | null)[];
    outputs: (InputValue | EdgeHandle | null)[];
    child: boolean;
    children?: string[];
    nodeType: string | undefined;
    percent?: number;
    hasSideEffects: boolean;
}

export interface WindowSize {
    readonly maximized: boolean;
    readonly width: number;
    readonly height: number;
}
