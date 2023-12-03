import moment from 'moment';
import 'moment/min/locales';

window.Webflow ||= [];
window.Webflow.push(() => {
  //#region init locale
  var docLang = document.documentElement.lang;
  moment.locale(docLang);
  //#endregion

  const updatesDatesInDom = () => {
    const dates = document.querySelectorAll<HTMLElement>('[ez--date-translate="date"]');
    if (!dates?.length) {
      return;
    }

    dates.forEach((dateElement: HTMLElement) => {
      if(dateElement.getAttribute('ez--date-translate') != 'date') {
        return;
      }
      // input date format must be YYYY-MM-DD
      const translatedDate: string = moment(dateElement.innerText, 'YYYY-MM-DD').format(dateElement.getAttribute('ez--date-translate-format')!);
      dateElement.innerText = translatedDate;
      dateElement.setAttribute('ez--date-translate', '');
    });
  }

  const realoadButtons = document.querySelectorAll<HTMLElement>('[ez--date-translate="reload"]');
    realoadButtons.forEach((element: HTMLElement) => {
    element.onclick = () => {
      // Set time out so it can update after button is clicked
      setTimeout(() => {
          updatesDatesInDom();
      }, 1)
    }
  });

  // Init on First load
  updatesDatesInDom();

});