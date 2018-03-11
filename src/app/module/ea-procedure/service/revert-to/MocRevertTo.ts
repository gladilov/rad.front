export const loadData = {
  _fields: {
    procedureChangeOptions: {
      _fields: {
        targetStatus: {
          // mode: 'view',
          _value: '',
          _options: [
            { value: '',  label: 'Выберите' },
            { value: '1', label: 'Прием заявок' },
            { value: '2', label: 'Рассмотрение заявок' },
            { value: '3', label: 'Ожидание торгов' },
            { value: '4', label: 'Подведение итогов' },
            { value: '5', label: 'Заключение контракта' },
          ],
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
        },
        documentReason: {
          _options: [
            { value: '1', label: 'Предписание контролирующего органа' },
            { value: '2', label: 'Решение судебного органа' },
          ],
          _value: '1',
        },
        instructionData: {
          _options: [
            { value: '1', label: 'Данные о предписании, выданном контролирующим органом' },
            { value: '2', label: 'Предписание отсутствует в реестре результатов контроля' },
          ],
          _value: '1',
        }
      }
    },
    procedureRequests: {},
    priceOffer: {},
    terms: {},
    extraConditions: {},
  }
};
