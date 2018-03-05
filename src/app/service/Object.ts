
class ValuePair {
  public constructor(
    public key: string,
    public value: any
  ) {}
}

class ValuePairMultiSelect {
  public constructor(
    public key: string,
    public value: any,
    private _default: boolean
  ) {}


  get default(): boolean {
    return this._default;
  }

  set default(value: boolean) {
    this._default = value;
  }
}

// export class ValuePairExt extends ValuePair {
//   unit: any;
// }

export class BaseObject {
  buildingType: string;
  private _key: string;
  private _value: string;
  private _default: any;

  public constructor(data: object = {}) {
    this.key = data['_key'] || '';
    this.value = data['_value'] || '';
    this.default = data['_default'] || null;
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get default(): any {
    return this._default;
  }

  set default(value: any) {
    this._default = value;
  }
}

/**
 * для описания селекторов (селект, радио)
 */
export class ObjectFormSelector extends BaseObject {
  private _options = Array<ValuePair>();

  public constructor(data: object = {}) {
    super(data);
    this.initOptions(data);
  }

  protected initOptions(data) {
    if (data['_options'] instanceof Array) {
      for (let i=0; i < data['_options'].length; ++i) {
        let vp = new ValuePair(
          data['_options'][i]['value'],
          data['_options'][i]['label']
        );
        this.options.push(vp);
      }
    }
  }

  get options(): ValuePair[] {
    return this._options;
  }

  set options(value: ValuePair[]) {
    this._options = value;
  }
}

export class ObjectFormMultiSelector extends BaseObject {
  private _options = Array<ValuePairMultiSelect>();

  constructor(data: object = {}) {
    super(data);
    this.initOptions(data);
  }

  protected initOptions(data) {
    if (data['_options'] instanceof Array) {
      for (let i = 0; i < data['_options'].length; ++i) {
        let vp = new ValuePairMultiSelect(
          data['_options'][i]['value'],
          data['_options'][i]['label'],
          data['_options'][i]['default'] || false,
        );
        this.options.push(vp);
      }
    }
  }

  get options(): ValuePairMultiSelect[] {
    return this._options;
  }

  set options(value: ValuePairMultiSelect[]) {
    this._options = value;
  }
}

// export class Services {
//   public options: ValuePair[] = [];
//
//   public constructor(data?) {
//     if (data != undefined) {
//       if (data['options'] != undefined) {
//          let opt = data['options'];
//         //this.options = data['options'];
//         for (let i in opt) {
//           let vp:ValuePair = new ValuePair(opt[i]['key'], opt[i]['value']);
//           //console.log(vp instanceof ValuePair);
//           this.options.push(vp);
//         }
//       }
//     }
//   }
// }

// export class Parking {
//   parkingType: formSelector;
//   cost: number;
//   freePlaces: number;
//   totalPlaces: number;
//   freeOfCharge: boolean;
//   guard: boolean;
//
//   public constructor(data?) {
//     if (data !== undefined) {
//       this.parkingType = data['parkingType'] || new formSelector;
//       this.cost = data['cost'] || 0;
//       this.freePlaces = data['freePlaces'] || 0;
//       this.totalPlaces = data['totalPlaces'] || 0;
//       this.freeOfCharge = data['freeOfCharge'] || false;
//       this.guard = data['guard'] || false;
//     }
//   }
// }

// export class BusinessCentreObject extends BaseObject {
//   services: Services = new Services();
//   parking: Parking = new Parking();
//
//   public constructor(data?: any) {
//     super(data);
//
//     if (data != undefined) {
//       if (data['services'] != undefined) {
//         this.services = new Services(data['services']);
//       }
//       //console.log('TTT', this.services);
//       //this.parking = new Parking(data['parking']) || new Parking();
//     }
//   }
// }