[
    {
      'repeat(5, 10)': {
        id: '{{index(1)}}',
        age: '{{integer(30, 60)}}',
        name: {
          first: '{{firstName()}}',
          last: '{{surname()}}'
        },
        phone: '+1 {{phone()}}',
        district: '{{city()}}, {{state()}}',
        platform: '{{lorem(1, "paragraphs")}}'
      }
    }
  ]