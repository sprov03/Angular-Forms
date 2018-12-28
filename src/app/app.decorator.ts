export function Hydrate(hydrationType: HydrationType, output?: string) {
  return (target, key) => {
    output = output ? output : key;
    if (!target.hydrators) {
      target.hydrators = {};
    }

    target.hydrators[key] = (model: any) => {
      switch (hydrationType) {
        case HydrationType.OverWrite: {
          return model[output] = 'OverWrite';
        }
      }
    };
  };
}

export enum HydrationType {
  OverWrite
}
