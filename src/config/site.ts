export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
export const tokens = { burgundy: '#780E25', logoRed: '#C80010', black: '#080808', ivory: '#FAF7F0', sage: '#78836B', ink: '#292C25', muted: '#63675D', border: '#DEDCD2' };
export const site = {
 name: 'PorkHolic', phone: '+918943958007', phoneSecondary: '+917012613992',
 phones: ['+91 89439 58007', '+91 70126 13992'],
 whatsapp: 'https://wa.me/918943958007?text=' + encodeURIComponent('Hello PorkHolic, I would like to know more about your pig farm in Kombai, Theni.'),
 instagram: '', facebook: '',
 maps: 'https://maps.app.goo.gl/peX2UPpzYLKWbSUj9',
};
export const navigation = [['home','Home'],['about','About'],['farm','Our Farm'],['gallery','Gallery'],['contact','Contact']] as const;
