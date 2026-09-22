<!-- SKELETON for cs-core/app-remote-utils.md — raw material only, not the final doc. 10 symbols. -->

## createRemoteApp
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hocs/createRemoteApp

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const createRemoteApp: <TProps>(rootComponent: ComponentType<TProps>) => () => {
    render(info: import("@module-federation/bridge-react").RenderParams): Promise<void>;
    destroy(info: import("@module-federation/bridge-react").DestroyParams): void;
};
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## ENABLE_SPLIT
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./constants

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const ENABLE_SPLIT = "1024px";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## getBorderRadiusSize
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const getBorderRadiusSize: (view: TBorderRadiusSizes) => string;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## glassedCSS
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./constants

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const glassedCSS: import("@emotion/utils").SerializedStyles;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## HostProvider
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/useHost

propsType: THostProviderProps (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export type THostProviderProps = PropsWithChildren<THostContextProps>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## importRemote
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./utils

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const importRemote: <T = any>({ url, scope, module, remoteEntryFileName, bustRemoteEntryCache, esm, }: TImportRemoteOptions) => Promise<T>;
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## MIN_DESKTOP
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./constants

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const MIN_DESKTOP = "1440px";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## MIN_TABLET
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./constants

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
export declare const MIN_TABLET = "768px";
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## p13nApi
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./api


### raw description (RU, from JSDoc)
```
(none found — check cs-core/cs-portal source manually)
```

### raw props type
```ts
(none found)
```

### demo examples found
(none — write a minimal example by hand from the props)

---

## useHost
tier: B · origin: cs-core · usedByApps: false · fromSpec: ./hooks/useHost

propsType: (signature, no dedicated Props type found) (source: cs-core)

### raw description (RU, from JSDoc)
```
Хук для получения сегмента, basename, externalNavigate.

Требует `HostProvider`.
```

### raw props type
```ts
export declare const useHost: () => import("./types").THostContextProps;
```

### demo examples found
(none — write a minimal example by hand from the props)

---
