function include(filename) {
	return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function onOpen() {
	SpreadsheetApp.getUi()
		.createAddonMenu()
		.addItem('About', 'showAboutSidebar')
		.addToUi();
}

function showAboutSidebar() {
  const ui = HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('IEX Cloud Finance')
    .setFaviconUrl('https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-newspaper-11.png');
  
  SpreadsheetApp.getUi().showSidebar(ui);
}

function getCurrentUserEmail() {
  return Session.getActiveUser().getEmail();
}

function getCoverImageLink() {
  return "https://www.nasdaq.com/sites/acquia.prod/files/image/29525db076bcc42505a356e55dbe94f38b28530b_getty-stock-market-data.jpg?710291822";
}

function getCardTitle() {
  return "IEX Finance Add-on for Google Sheets";
}

function getDetailsConfig() {
  const api = new IEXFinanceAPI('');
  return [
    { 
      title: 'How to use', 
      details: [
        'Register using the above button to get a Free API key;', 
        'use =IEXFINANCE on your spreadsheet;', 
        'refer to the built in helper for further steps;'
      ] 
    }, 
    { title: 'Demo API Key', details: ['Tpk_65eeb50270064a0c8d27680865393369'], enableCopy: true },
    { title: 'Endpoints', details: Object.keys(api.endpoints), enableCopy: true },
    { 
      title: 'Disclaimer', 
      details: [
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.',
        ], 
    },
    { title: 'Terms of Service', details: ['https://iexcloud.io/terms/'] },
  ];
}

function getButtonsConfig() {
  return {
    header: [
      {
        label: 'Register', 
        url: 'https://iexcloud.io/cloud-login#/register/',
        tooltip: 'Takes you to the registration page where you can get a free API key. You will need it.',
      },
      {
        label: 'Product Info', 
        url: 'https://iexcloud.io/products/',
        tooltip: 'Learn more about IEX Cloud\'s products.',
      },
      {
        label: 'API Docs', 
        url: 'https://iexcloud.io/docs/api/',
        tooltip: 'Learn more about IEX Cloud\'s API.',
      }
    ],
    footer: [
      {
        label: 'GitHub', 
        url: 'https://github.com/KamisamaPT/iexcloud-googlescript',
        icon: 'laptop',
        tooltip: 'Check out this project on github!',
      },
      {
        label: 'Buy me Coffee', 
        url: 'https://www.buymeacoffee.com/hvirtudes',
        icon: 'coffee',
        tooltip: 'Like this add-on? Consider buying me a coffee!',
      }
    ]
  };
}