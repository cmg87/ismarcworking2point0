const generateVcard = () => {
  const vcf = `BEGIN:VCARD
  VERSION:3.0
  FN:Marc Habbouche
  ORG:Curated Events
  TEL:2164049099
  EMAIL:Mhabbouche@curatedevents.com
  END:VCARD`;

  return vcf;
};

export default generateVcard;
