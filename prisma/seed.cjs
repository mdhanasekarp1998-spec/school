require("dotenv/config");
const { PrismaClient } = require(".prisma/client");
const { hashSync } = require("bcryptjs");

const p = new PrismaClient();

async function main() {
  const cb = await p.board.create({ data: { name: "CBSE" } });
  const ic = await p.board.create({ data: { name: "ICSE" } });
  const ig = await p.board.create({ data: { name: "IGCSE" } });
  const st = await p.board.create({ data: { name: "STATE" } });

  const tg = await p.state.create({ data: { name: "Telangana" } });
  const ap = await p.state.create({ data: { name: "Andhra Pradesh" } });
  const ka = await p.state.create({ data: { name: "Karnataka" } });
  const tn = await p.state.create({ data: { name: "Tamil Nadu" } });
  const mh = await p.state.create({ data: { name: "Maharashtra" } });
  const dl = await p.state.create({ data: { name: "Delhi" } });

  const hyd = await p.city.create({ data: { name: "Hyderabad", stateId: tg.id } });
  const wrl = await p.city.create({ data: { name: "Warangal", stateId: tg.id } });
  const viz = await p.city.create({ data: { name: "Visakhapatnam", stateId: ap.id } });
  const vjw = await p.city.create({ data: { name: "Vijayawada", stateId: ap.id } });
  const blr = await p.city.create({ data: { name: "Bangalore", stateId: ka.id } });
  const mys = await p.city.create({ data: { name: "Mysore", stateId: ka.id } });
  const chn = await p.city.create({ data: { name: "Chennai", stateId: tn.id } });
  const cbr = await p.city.create({ data: { name: "Coimbatore", stateId: tn.id } });
  const mum = await p.city.create({ data: { name: "Mumbai", stateId: mh.id } });
  const pun = await p.city.create({ data: { name: "Pune", stateId: mh.id } });
  const nwd = await p.city.create({ data: { name: "New Delhi", stateId: dl.id } });
  const noi = await p.city.create({ data: { name: "Noida", stateId: dl.id } });

  const schools = [
    { name: "Sri Chaitanya School - Madhapur", address: "Plot No: 80, Ayyappa Society, Madhapur, Hyderabad", phone: "040-44600600", boardId: cb.id, cityId: hyd.id },
    { name: "Sri Chaitanya School - Kukatpally", address: "KPHB Colony, Kukatpally, Hyderabad", phone: "040-44600601", boardId: cb.id, cityId: hyd.id },
    { name: "Sri Chaitanya School - Gachibowli", address: "Gachibowli, Hyderabad", phone: "040-44600602", boardId: ic.id, cityId: hyd.id },
    { name: "Sri Chaitanya School - Warangal", address: "Hanamkonda, Warangal", phone: "0870-2500100", boardId: st.id, cityId: wrl.id },
    { name: "Sri Chaitanya School - MVP Colony", address: "MVP Colony, Visakhapatnam", phone: "0891-2700100", boardId: cb.id, cityId: viz.id },
    { name: "Sri Chaitanya School - Vijayawada", address: "Benz Circle, Vijayawada", phone: "0866-2400100", boardId: ic.id, cityId: vjw.id },
    { name: "Sri Chaitanya School - Whitefield", address: "Whitefield, Bangalore", phone: "080-44600600", boardId: cb.id, cityId: blr.id },
    { name: "Sri Chaitanya School - JP Nagar", address: "JP Nagar, Bangalore", phone: "080-44600601", boardId: ig.id, cityId: blr.id },
    { name: "Sri Chaitanya School - Mysore", address: "Vijayanagar, Mysore", phone: "0821-2400100", boardId: cb.id, cityId: mys.id },
    { name: "Sri Chaitanya School - Anna Nagar", address: "Anna Nagar, Chennai", phone: "044-44600600", boardId: cb.id, cityId: chn.id },
    { name: "Sri Chaitanya School - OMR", address: "OMR Road, Chennai", phone: "044-44600601", boardId: ic.id, cityId: chn.id },
    { name: "Sri Chaitanya School - Coimbatore", address: "RS Puram, Coimbatore", phone: "0422-2400100", boardId: st.id, cityId: cbr.id },
    { name: "Sri Chaitanya School - Andheri", address: "Andheri West, Mumbai", phone: "022-44600600", boardId: cb.id, cityId: mum.id },
    { name: "Sri Chaitanya School - Thane", address: "Thane West, Mumbai", phone: "022-44600601", boardId: ic.id, cityId: mum.id },
    { name: "Sri Chaitanya School - Hinjewadi", address: "Hinjewadi, Pune", phone: "020-44600600", boardId: cb.id, cityId: pun.id },
    { name: "Sri Chaitanya School - Dwarka", address: "Sector 10, Dwarka, New Delhi", phone: "011-44600600", boardId: cb.id, cityId: nwd.id },
    { name: "Sri Chaitanya School - Noida", address: "Sector 62, Noida", phone: "0120-4400100", boardId: ig.id, cityId: noi.id },
    { name: "Sri Chaitanya School - Secunderabad", address: "Secunderabad, Hyderabad", phone: "040-44600603", boardId: st.id, cityId: hyd.id },
  ];
  for (const s of schools) await p.school.create({ data: s });

  const achievements = [
    { title: "Sri Chaitanya's World Record at NASA", description: "Students set a world record at the NASA Space Settlement Design Competition.", category: "academic" },
    { title: "NEET 2025 - 50 Students in Top 100", description: "50 students secured ranks in the top 100 of NEET 2025.", category: "academic" },
    { title: "JEE Advanced 2025 - Record Results", description: "Outstanding results in JEE Advanced 2025 with 500+ IIT selections.", category: "academic" },
    { title: "CBSE Class X - 100% Pass Rate", description: "All CBSE schools achieved 100% pass rate with 85% scoring above 90%.", category: "academic" },
    { title: "NASA Healthy Space Design Competition", description: "Students won the NASA Live in a Healthy Space Design Competition.", category: "co_curricular" },
    { title: "National Science Olympiad Winners", description: "Students won 25 gold medals at the National Science Olympiad 2025.", category: "co_curricular" },
    { title: "Inter-School Debate Championship", description: "Won the All India Inter-School Debate Championship held in New Delhi.", category: "co_curricular" },
    { title: "National Level Sports Achievements", description: "Students won 15 medals at the National School Games including 5 golds.", category: "sports" },
    { title: "State Level Cricket Championship", description: "Cricket team won the State Level Inter-School Cricket Championship.", category: "sports" },
    { title: "National Swimming Championship", description: "3 students qualified and won medals at National Swimming Championship.", category: "sports" },
  ];
  for (const a of achievements) await p.achievement.create({ data: a });

  const news = [
    { title: "CBSE Class X State-wise Top Results", body: "Students have once again topped the CBSE Class X examinations across multiple states.", category: "Academics", isFeatured: true },
    { title: "NEET 2025 All India Top 100 Ranks", body: "Students secured 50 positions in the All India top 100 ranks of NEET 2025.", category: "Academics", isFeatured: true },
    { title: "Admissions Open for 2026-2027", body: "Admissions open for academic year 2026-2027 across 950+ schools in 22 states.", category: "Admissions", isFeatured: false },
    { title: "Annual Sports Day Celebration", body: "The Annual Sports Day was celebrated with great enthusiasm across all schools.", category: "Events", isFeatured: false },
    { title: "New Campus Inaugurated in Bangalore", body: "A state-of-the-art campus has been inaugurated in Whitefield, Bangalore.", category: "Campus", isFeatured: false },
    { title: "Teacher Training Workshop 2026", body: "Comprehensive teacher training workshop on modern pedagogical techniques.", category: "Events", isFeatured: false },
    { title: "International Math Olympiad Selection", body: "12 students selected for the International Mathematical Olympiad team.", category: "Academics", isFeatured: true },
    { title: "Partnership with Cambridge University Press", body: "Strategic partnership with Cambridge University Press for curriculum development.", category: "Academics", isFeatured: false },
  ];
  for (const n of news) await p.newsEvent.create({ data: n });

  await p.user.create({
    data: { email: "admin@srichaitanya.net", name: "Admin User", passwordHash: hashSync("admin123", 10), role: "admin" },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => p.$disconnect());
