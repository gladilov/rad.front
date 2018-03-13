export const loadData = {
  _fields: {
    procedureInfo: {
      _fields: {
        registrationNumber: {
          _value: '03033010561981919681',
        },
        name: {
          _value: 'Приобретение подарочной и наградной продукции для мероприятий по молодежной политике'
        },
        status: {
          _options: [
            {value: 'a1', label: 'Заключение контракта'},
            {value: 'a2', label: 'Заключение контракта2'},
            {value: 'a3', label: 'Заключение контракта3'},
          ],
          _value: 'a2'
        },
        requestEndGiveDateTime: {
          _value: '2017-09-10 20:00'
        },
        requestReviewDateTime: {
          _value: '2017-09-10 12:10'
        },
        conditionalHoldingDateTime: {
          _value: '2017-09-10 12:00'
        },
      }
    },
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
