const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Address",
      action: "647/2A, Vashishtpuram, Jankipuram Extension, Lucknow, 226021, India.",
      text: "647/2A, vashishtpuram, Jankipuram Extension, Lucknow, 226021, India.",
    },
    {
      id: 2,
      title: "Customer Care No.",
      action: "tel:+(91) 8542951004",
      text: "+91-8542951004",
    },
    {
      id: 3,
      title: "Email",
      action: "sales@eurasiaglobal.net",
      text: "sales@eurasiaglobal.net",
    },
  ];
  
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className={"text-14 mt-30"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-blue-1 mt-3">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
