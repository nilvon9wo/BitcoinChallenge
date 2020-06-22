1. In order to make a page which can be displayed on the Salesforce Platform, 
I developed a "Community" on a "Scratch Org".  At the time of this writing,
the page for this community can be found at:

https://sandbox-bitcoin-challenge-developer-edition.cs82.force.com/price/s/

(As this is a scratch org, this page may no longer exist.)

2. As the challenge does not specify anything related to Salesforce,
I've chosen to minimalize Salesforce's involvement to just hosting the solution.
The visitor's web-browser will be responsible for fetching data from the API.

3. While the challenge specifically declares "optic of the page does not really matter",
it may be worth noting the currency display may seem "weird".  Salesforce has its own logic
for how to localize currency.  It is not easy to override this while using native Salesforce
functionality, such as the `<lightning-formatted-number>` component.

See also, https://salesforce.stackexchange.com/questions/170794/where-i-need-to-change-the-format-of-date-and-currency-for-german-locale



