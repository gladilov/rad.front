export const loadData = {
  _fields: {
    procedureChangeOptions: {
      _fields: {
        targetStatus: {
          // mode: 'view',
          _value: '',
        },
        protocols: {
          _options: [
            { value: '1', label: 'Протокол рассмотрения заявок' },
            { value: '2', label: 'Протокол проведения электронного аукциона' },
            { value: '3', label: 'Протокол подведения итогов' },
            { value: '4', label: 'Протокол о признании электронного аукциона несостоявшимся' },
            { value: '5', label: 'Протокол рассмотрения единственной заявки' },
            { value: '6', label: 'Протокол рассмотрения единственной заявки' },
            { value: '7', label: 'Протокол рассмотрения заявки единственного участника' },
            { value: '8', label: 'Протокол об отказе от заключения контракта' },
            { value: '9', label: 'Протокол признания участника уклонившимся от заключения контракта' },
          ],
          _value: []
        }
      }
    },
    procedureRequests: {},
    priceOffer: {},
    terms: {},
    extraConditions: {},
  }
};
