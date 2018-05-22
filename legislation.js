[
    {
      'repeat(5, 10)': {
        id: '{{index(1)}}',
        name: '{{lorem(1, "words")}}',
        about: '{{lorem(1, "paragraphs")}}',
        registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
      }
    }
  ]