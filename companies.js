[
    {
      'repeat(5, 10)': {
        id: '{{objectId()}}',
        company: '{{company().toUpperCase()}}',
        phone: '+1 {{phone()}}',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
      }
    }
  ]