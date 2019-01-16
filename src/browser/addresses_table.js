import Table from './table.js'

export default class AddressesTable extends Table {
  constructor (dispatcher, index, total, clusterId, currency, keyspace) {
    super(dispatcher, index, total, currency, keyspace)
    this.clusterId = clusterId
    this.columns = [
      { name: 'Address',
        data: 'address'
      },
      { name: 'First usage',
        data: 'firstTx.timestamp',
        render: this.formatValue(this.formatTimestamp)
      },
      { name: 'Last usage',
        data: 'lastTx.timestamp',
        render: this.formatValue(this.formatTimestamp)
      },
      { name: 'Balance',
        data: 'balance',
        className: 'text-right',
        render: (value, type) => 
          this.formatValue(value => this.formatCurrency(value, keyspace, true))(value[this.currency], type)
      },
      { name: 'Received',
        data: 'totalReceived',
        className: 'text-right',
        render: (value, type) => 
          this.formatValue(value => this.formatCurrency(value, keyspace, true))(value[this.currency], type)
      }
    ]
    this.loadMessage = 'loadAddresses'
    this.resultField = 'addresses'
    this.selectMessage = 'selectAddress'
    this.loadParams = this.clusterId
  }
  isSmall () {
    return this.total < 200
  }
}
