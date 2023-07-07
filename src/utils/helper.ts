
const helper = {
  
  truncateTxt: function(text: string, len: number): string {
    // default length
    len = len ? len : 100     

    if (text.length > len) {
      return text.substring(0, len) + "...";
    } else {
      return text;
    }
  },

  makeDate: function(dateStr: any): string {
    const date: Date = new Date(dateStr) 
    const options: {
      weekday: "short" | "long" | "narrow" | undefined,
      month: "short" | "numeric" | "2-digit" | undefined,
      year: "numeric" | "2-digit" | undefined,
    } = { 
      weekday: 'short', 
      month: 'short', 
      year: 'numeric' 
    };
    const formattedDate = date.toLocaleDateString('en-US', options );
    return formattedDate
  }
}

export default helper