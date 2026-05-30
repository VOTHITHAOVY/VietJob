/* ═══════════════════════════════════════════════════════════════
   COMPANIES DATA  —  shared source of truth
   CompanyDetail.js reads this via sessionStorage when navigating
   ═══════════════════════════════════════════════════════════════ */
const COMPANIES = [
    {
        id: 1,
        name: 'TechCorp Solution',
        type: 'Outsourcing',
        sector: 'IT – Phần mềm',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124996.png',
        rating: 4.8,
        reviews: 120,
        location: 'Quận 1, TP. HCM',
        city: 'TP. HCM',
        size: '150–200 nhân sự',
        companyType: 'Nước ngoài',
        tags: ['ReactJS', 'Node.JS', 'AWS'],
        badge: 'top',
        jobs: 42,
        founded: '2015',
        posted: '1 ngày trước',
        website: 'techcorp.vn',
        about: [
            'TechCorp Solution là công ty outsourcing phần mềm hàng đầu tại TP. Hồ Chí Minh, chuyên cung cấp các giải pháp phát triển web và mobile cho khách hàng tại Mỹ, Úc và châu Âu.',
            'Với đội ngũ kỹ sư giàu kinh nghiệm, chúng tôi xây dựng các hệ thống hiệu suất cao, từ nền tảng SaaS phục vụ hàng triệu người dùng đến các ứng dụng doanh nghiệp phức tạp.',
            'Stack công nghệ hiện đại bao gồm ReactJS, Node.js, AWS và Docker, cùng quy trình Agile/Scrum giúp các team nhỏ giao hàng nhanh và liên tục.'
        ],
        benefits: [
            { title: 'Lương tháng 13 + thưởng KPI', desc: 'Thưởng hiệu suất hàng quý, minh bạch theo KPI cá nhân.' },
            { title: 'Bảo hiểm sức khoẻ cao cấp', desc: 'Gói PTI Gold bao gồm bản thân và một người thân.' },
            { title: 'Review lương 2 lần/năm', desc: 'Tăng lương theo năng lực, không phụ thuộc vào thâm niên.' },
            { title: 'MacBook Pro + màn hình ngoài', desc: 'Thiết bị làm việc theo lựa chọn cá nhân.' },
            { title: 'Làm việc từ xa thứ Sáu', desc: 'WFH mỗi thứ Sáu, giờ làm linh hoạt từ 8–10 AM.' },
            { title: 'Ngân sách học tập $300/năm', desc: 'Chi cho khoá học, sách kỹ thuật, hội thảo.' }
        ],
        cultureTags: ['Ownership', 'Craftsmanship', 'Work-Life Balance', 'Remote-friendly', 'Agile', 'Continuous Learning'],
        openJobs: [
            { title: 'Senior Frontend Developer (ReactJS)', salary: '$1,200–$1,800', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: 'hot' },
            { title: 'Backend Engineer (Node.js / AWS)', salary: '$1,000–$1,600', location: 'Quận 1, TP. HCM', type: 'fulltime', exp: '2–4 năm', badge: 'new' },
            { title: 'DevOps Engineer (Docker / K8s)', salary: '$1,400–$2,000', location: 'Remote', type: 'remote', exp: '3–5 năm', badge: 'top' },
            { title: 'Product Designer (Figma)', salary: '$800–$1,200', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '2–3 năm', badge: '' },
            { title: 'QA Automation Engineer', salary: '$700–$1,100', location: 'Quận 1, TP. HCM', type: 'fulltime', exp: '1–3 năm', badge: 'new' }
        ],
        employeeReviews: [
            { name: 'Nguyễn T.H.', role: 'Senior Frontend Developer · 2 năm', rating: 5, text: 'Môi trường kỹ thuật tốt, codebase sạch và được maintain tốt. Management thực sự lắng nghe feedback. Chính sách WFH thứ Sáu tuy nhỏ nhưng tạo ra sự khác biệt lớn về tinh thần.', pros: 'Văn hoá kỹ thuật mạnh, stack công nghệ hiện đại, phát triển sự nghiệp nhanh.', cons: 'Deadline đôi khi khá gắt trong giai đoạn launch sản phẩm.', date: 'Tháng 5, 2026', avatar: 'N', color: '#7C3AED' },
            { name: 'Trần M.L.', role: 'Product Designer · 1.5 năm', rating: 4, text: 'Một trong những công ty tốt nhất tôi từng làm việc. Designer ở đây có quyền sở hữu thực sự đối với quyết định sản phẩm — không chỉ làm theo spec.', pros: 'Design được tôn trọng, cộng tác cross-functional tuyệt vời.', cons: 'Vị trí văn phòng không quá thuận tiện. Chỗ đậu xe khá hạn chế.', date: 'Tháng 4, 2026', avatar: 'T', color: '#16A34A' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 2,
        name: 'Vingroup JSC',
        type: 'Tập đoàn lớn',
        sector: 'Đa ngành nghề',
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        rating: 4.5,
        reviews: 2450,
        location: 'Long Biên, Hà Nội',
        city: 'Hà Nội',
        size: '10,000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['Management', 'Sales', 'E-Commerce'],
        badge: 'top',
        jobs: 128,
        founded: '1993',
        posted: '2 ngày trước',
        website: 'vingroup.net',
        about: [
            'Vingroup JSC là tập đoàn kinh tế tư nhân lớn nhất Việt Nam, hoạt động đa ngành từ bất động sản, ô tô (VinFast), y tế đến công nghệ và giáo dục.',
            'Với hơn 10,000 nhân sự trên toàn quốc, Vingroup không ngừng mở rộng sang các lĩnh vực công nghệ cao và phát triển bền vững.',
            'Chúng tôi tìm kiếm những nhân tài có khát vọng lớn, sẵn sàng dẫn dắt sự thay đổi và tạo ra tác động thực sự cho xã hội Việt Nam.'
        ],
        benefits: [
            { title: 'Lương cạnh tranh + thưởng lớn', desc: 'Gói lương top-market, thưởng cuối năm lên tới 3–5 tháng lương.' },
            { title: 'Bảo hiểm sức khoẻ toàn diện', desc: 'Bảo hiểm cho bản thân và gia đình.' },
            { title: 'Cơ hội thăng tiến nhanh', desc: 'Hệ thống lộ trình nghề nghiệp rõ ràng trong tập đoàn.' },
            { title: 'Ưu đãi sản phẩm Vingroup', desc: 'Giảm giá khi mua xe VinFast, nhà VinHomes, dịch vụ Vinmec.' },
            { title: 'Đào tạo nội bộ chuyên sâu', desc: 'Học viện Vingroup với hàng trăm khoá học nội bộ.' }
        ],
        cultureTags: ['Tham vọng', 'Đổi mới', 'Tốc độ', 'Kỷ luật', 'Tầm nhìn lớn', 'Tác động xã hội'],
        openJobs: [
            { title: 'Product Manager (E-Commerce)', salary: '35–55 triệu', location: 'Long Biên, HN', type: 'fulltime', exp: '3–5 năm', badge: 'hot' },
            { title: 'Senior Sales Manager (B2B)', salary: '30–50 triệu', location: 'Hà Nội', type: 'fulltime', exp: '4–6 năm', badge: 'urgent' },
            { title: 'Data Analyst', salary: '20–35 triệu', location: 'Hà Nội', type: 'hybrid', exp: '1–3 năm', badge: '' },
            { title: 'Marketing Manager', salary: '28–45 triệu', location: 'Hà Nội', type: 'fulltime', exp: '3–5 năm', badge: 'new' }
        ],
        employeeReviews: [
            { name: 'Phạm Q.A.', role: 'Product Manager · 3 năm', rating: 5, text: 'Cơ hội làm việc với các dự án tầm cỡ quốc gia, ảnh hưởng đến hàng triệu người. Scale và tốc độ phát triển ở đây không nơi nào sánh bằng.', pros: 'Quy mô lớn, thương hiệu mạnh, cơ hội thăng tiến rõ ràng.', cons: 'Áp lực công việc cao, nhiều quy trình phê duyệt.', date: 'Tháng 5, 2026', avatar: 'P', color: '#F59E0B' },
            { name: 'Lê T.B.', role: 'Data Analyst · 2 năm', rating: 4, text: 'Dữ liệu cực kỳ phong phú và thú vị để làm việc. Đội ngũ chuyên nghiệp, môi trường học hỏi tốt cho người mới.', pros: 'Data đa dạng, công cụ xịn, đồng nghiệp giỏi.', cons: 'Thỉnh thoảng OT nhiều vào các dịp lễ, Tết.', date: 'Tháng 3, 2026', avatar: 'L', color: '#0EA5E9' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=75',
            'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=75',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=75',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=75',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=75',
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=75'
        ]
    },
    {
        id: 3,
        name: 'Grab Vietnam',
        type: 'MNC / Singapore',
        sector: 'Dịch vụ vận tải',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111628.png',
        rating: 4.9,
        reviews: 890,
        location: 'Quận 7, TP. HCM',
        city: 'TP. HCM',
        size: '500–1000 nhân sự',
        companyType: 'MNC',
        tags: ['Product', 'Go-Lang', 'Swift'],
        badge: 'top',
        jobs: 15,
        founded: '2012',
        posted: 'Hôm nay',
        website: 'grab.com/vn',
        about: [
            'Grab là siêu ứng dụng hàng đầu Đông Nam Á, cung cấp dịch vụ đi lại, giao đồ ăn, giao hàng và thanh toán tài chính cho hàng triệu người dùng mỗi ngày.',
            'Grab Vietnam là một trong những trung tâm công nghệ lớn nhất của Grab tại SEA, đóng vai trò quan trọng trong việc xây dựng các tính năng cốt lõi cho toàn tập đoàn.',
            'Chúng tôi vận hành hệ thống phân tán quy mô lớn, xử lý hàng triệu giao dịch mỗi giây với yêu cầu availability và latency khắt khe nhất ngành.'
        ],
        benefits: [
            { title: 'Lương USD cạnh tranh', desc: 'Benchmark theo thị trường Singapore, review hàng năm.' },
            { title: 'Cổ phần / RSU', desc: 'Restricted Stock Units sau 1 năm, vest theo lịch 4 năm.' },
            { title: 'Bảo hiểm sức khoẻ quốc tế', desc: 'Gói AXA Gold cho toàn gia đình.' },
            { title: 'Flexible working', desc: 'Hybrid model, core hours 10 AM–4 PM.' },
            { title: 'Grab credits hàng tháng', desc: 'Tín dụng sử dụng dịch vụ Grab miễn phí mỗi tháng.' },
            { title: 'Ngân sách L&D không giới hạn', desc: 'Khoá học, conference, certification toàn cầu.' }
        ],
        cultureTags: ['Move Fast', 'High Impact', 'Data-driven', 'Diversity', 'Remote-friendly', 'Engineering Excellence'],
        openJobs: [
            { title: 'Staff Software Engineer (Go-Lang)', salary: '$3,000–$5,000', location: 'Quận 7, TP. HCM', type: 'hybrid', exp: '6+ năm', badge: 'top' },
            { title: 'iOS Developer (Swift / SwiftUI)', salary: '$2,000–$3,500', location: 'Quận 7, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: 'hot' },
            { title: 'Senior Product Manager', salary: '$2,500–$4,000', location: 'Quận 7, TP. HCM', type: 'hybrid', exp: '4–6 năm', badge: '' },
            { title: 'Data Scientist (ML / Recommendation)', salary: '$2,200–$3,800', location: 'Remote', type: 'remote', exp: '3–5 năm', badge: 'new' }
        ],
        employeeReviews: [
            { name: 'Hoàng M.K.', role: 'Senior Engineer · 3 năm', rating: 5, text: 'Bài toán kỹ thuật ở Grab thuộc hàng thách thức nhất Việt Nam — distributed systems thật sự ở quy mô hàng triệu users. Đồng nghiệp toàn senior và staff engineer từ các big tech.', pros: 'Bài toán khó, đồng nghiệp giỏi, lương xịn, RSU hấp dẫn.', cons: 'Bar kỹ thuật cao, interview process khá dài.', date: 'Tháng 5, 2026', avatar: 'H', color: '#059669' },
            { name: 'Vũ T.N.', role: 'Product Manager · 2 năm', rating: 5, text: 'PM ở Grab được trao quyền thực sự. Tôi own roadmap của một tính năng dùng bởi 5 triệu user. Culture data-driven giúp mọi quyết định đều có cơ sở rõ ràng.', pros: 'Impact lớn, autonomy cao, data tools xịn.', cons: 'Pace nhanh, áp lực delivery khá lớn.', date: 'Tháng 4, 2026', avatar: 'V', color: '#7C3AED' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 4,
        name: 'Sapo Technology',
        type: 'Sản phẩm công nghệ',
        sector: 'E-commerce / Retail',
        logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
        rating: 4.2,
        reviews: 312,
        location: 'Thanh Xuân, Hà Nội',
        city: 'Hà Nội',
        size: '200–500 nhân sự',
        companyType: 'Trong nước',
        tags: ['PHP', 'Vue.JS', 'Laravel'],
        badge: null,
        jobs: 28,
        founded: '2008',
        posted: '3 ngày trước',
        website: 'sapo.vn',
        about: [
            'Sapo Technology là công ty công nghệ cung cấp nền tảng quản lý bán hàng omnichannel hàng đầu tại Việt Nam, phục vụ hơn 100,000 doanh nghiệp vừa và nhỏ.',
            'Nền tảng Sapo cho phép các shop bán hàng đồng bộ trên cửa hàng vật lý, website, Facebook, TikTok và Shopee trong một hệ thống duy nhất.',
            'Chúng tôi đang trong giai đoạn tăng trưởng mạnh với kế hoạch mở rộng sang Đông Nam Á trong 2–3 năm tới.'
        ],
        benefits: [
            { title: 'Lương thưởng cạnh tranh', desc: 'Review lương 1 lần/năm + thưởng dự án.' },
            { title: 'Bảo hiểm đầy đủ', desc: 'BHXH, BHYT, BHTN theo quy định + bảo hiểm sức khoẻ.' },
            { title: 'Đào tạo & phát triển', desc: 'Workshop nội bộ hàng tháng, mentoring từ senior.' },
            { title: 'Team building 2 lần/năm', desc: 'Du lịch team và các hoạt động gắn kết.' }
        ],
        cultureTags: ['Product-minded', 'Collaborative', 'Customer-first', 'Growth', 'Vietnam Pride'],
        openJobs: [
            { title: 'Senior PHP Developer (Laravel)', salary: '25–40 triệu', location: 'Thanh Xuân, HN', type: 'hybrid', exp: '3–5 năm', badge: 'hot' },
            { title: 'Vue.js Frontend Developer', salary: '20–35 triệu', location: 'Thanh Xuân, HN', type: 'fulltime', exp: '2–4 năm', badge: '' },
            { title: 'Mobile Developer (Flutter)', salary: '22–38 triệu', location: 'Hà Nội', type: 'hybrid', exp: '2–4 năm', badge: 'new' }
        ],
        employeeReviews: [
            { name: 'Đặng H.T.', role: 'Backend Developer · 2.5 năm', rating: 4, text: 'Môi trường làm việc thoải mái, đồng nghiệp thân thiện. Codebase phức tạp nhưng được tài liệu hoá tốt. Tốc độ phát triển nghề nghiệp phụ thuộc nhiều vào bản thân.', pros: 'Work-life balance tốt, đồng nghiệp dễ chịu, sản phẩm thực tế.', cons: 'Lương chưa thực sự cạnh tranh so với các công ty nước ngoài.', date: 'Tháng 4, 2026', avatar: 'D', color: '#EA580C' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 5,
        name: 'FPT Software',
        type: 'Outsourcing',
        sector: 'IT – Phần mềm',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png',
        rating: 4.3,
        reviews: 1800,
        location: 'Cầu Giấy, Hà Nội',
        city: 'Hà Nội',
        size: '5000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['Java', 'ReactJS', '.NET'],
        badge: null,
        jobs: 87,
        founded: '1999',
        posted: '1 tuần trước',
        website: 'fpt-software.com',
        about: [
            'FPT Software là công ty outsourcing phần mềm lớn nhất Việt Nam với hơn 25 năm kinh nghiệm, phục vụ khách hàng tại hơn 30 quốc gia trên toàn cầu.',
            'Với hơn 30,000 kỹ sư toàn cầu, FPT Software là đối tác tin cậy của nhiều tập đoàn Fortune 500 trong lĩnh vực chuyển đổi số, AI và cloud.',
            'Chúng tôi cung cấp môi trường làm việc chuyên nghiệp với quy trình chuẩn quốc tế CMMI Level 5, mở ra cơ hội làm việc với khách hàng toàn cầu.'
        ],
        benefits: [
            { title: 'Lương + thưởng theo dự án', desc: 'Cơ chế onsite allowance khi làm việc tại nước ngoài.' },
            { title: 'Cơ hội onsite nước ngoài', desc: 'Nhật Bản, Mỹ, châu Âu — cơ hội onsite cho kỹ sư xuất sắc.' },
            { title: 'Đào tạo chứng chỉ quốc tế', desc: 'Hỗ trợ thi AWS, Azure, PMP, ISTQB...' },
            { title: 'Công đoàn năng động', desc: 'Sự kiện thể thao, văn nghệ, team building toàn quốc.' },
            { title: 'Trợ cấp ăn trưa', desc: 'Nhà ăn nội bộ và trợ cấp bữa trưa hàng ngày.' }
        ],
        cultureTags: ['Professional', 'Global Mindset', 'Teamwork', 'Quality', 'Continuous Improvement'],
        openJobs: [
            { title: 'Java Backend Developer (Spring Boot)', salary: '20–35 triệu', location: 'Cầu Giấy, HN', type: 'fulltime', exp: '2–5 năm', badge: 'hot' },
            { title: '.NET Developer (C# / Azure)', salary: '22–38 triệu', location: 'Cầu Giấy, HN', type: 'fulltime', exp: '2–4 năm', badge: '' },
            { title: 'ReactJS Frontend Developer', salary: '18–32 triệu', location: 'Hà Nội', type: 'hybrid', exp: '1–3 năm', badge: 'new' },
            { title: 'Test Engineer (Manual + Auto)', salary: '15–25 triệu', location: 'Hà Nội', type: 'fulltime', exp: '1–3 năm', badge: '' },
            { title: 'Business Analyst (IT/Banking)', salary: '25–40 triệu', location: 'Hà Nội', type: 'fulltime', exp: '3–5 năm', badge: 'urgent' }
        ],
        employeeReviews: [
            { name: 'Nguyễn V.A.', role: 'Java Developer · 4 năm', rating: 4, text: 'Quy trình làm việc chuyên nghiệp, cơ hội tiếp xúc với các dự án quốc tế lớn. Đây là nơi tốt để xây dựng nền tảng kỹ thuật vững chắc cho career.', pros: 'Dự án đa dạng, cơ hội onsite, quy trình chuẩn quốc tế.', cons: 'Môi trường khá corporate, ít linh hoạt hơn startup.', date: 'Tháng 5, 2026', avatar: 'N', color: '#7C3AED' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 6,
        name: 'MoMo E-Wallet',
        type: 'Fintech',
        sector: 'Tài chính / Ngân hàng',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
        rating: 4.6,
        reviews: 650,
        location: 'Quận 1, TP. HCM',
        city: 'TP. HCM',
        size: '1000+ nhân sự',
        companyType: 'Startup',
        tags: ['ReactJS', 'Figma', 'Python'],
        badge: 'hot',
        jobs: 33,
        founded: '2010',
        posted: 'Hôm nay',
        website: 'momo.vn',
        about: [
            'MoMo là ví điện tử số 1 Việt Nam với hơn 31 triệu người dùng, cung cấp các dịch vụ thanh toán, chuyển tiền, vay tiêu dùng và đầu tư tài chính.',
            'Được backed bởi Goldman Sachs, Warburg Pincus và nhiều quỹ đầu tư hàng đầu thế giới, MoMo đang trong lộ trình IPO và mở rộng sang các thị trường Đông Nam Á.',
            'Engineering team của MoMo xây dựng các hệ thống xử lý hàng triệu giao dịch mỗi ngày với yêu cầu bảo mật và reliability ở mức độ tài chính quốc tế.'
        ],
        benefits: [
            { title: 'Stock options / ESOP', desc: 'Cổ phần công ty — tiềm năng sinh lời lớn khi IPO.' },
            { title: 'Lương top-market', desc: 'Benchmark theo thị trường fintech quốc tế.' },
            { title: 'Bảo hiểm sức khoẻ cao cấp', desc: 'Gói Bảo Việt Gold cho bản thân và gia đình.' },
            { title: 'Môi trường startup năng động', desc: 'Flat hierarchy, ý kiến mọi cấp đều được lắng nghe.' },
            { title: 'Flexible & hybrid', desc: 'Tự quản lý giờ làm, WFH linh hoạt.' }
        ],
        cultureTags: ['Move Fast', 'Fintech Innovation', 'User-first', 'ESOP', 'High Impact', 'Diversity'],
        openJobs: [
            { title: 'Senior ReactJS Developer', salary: '$1,500–$2,500', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: 'hot' },
            { title: 'Python Backend Engineer (Fintech)', salary: '$1,200–$2,000', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: 'hot' },
            { title: 'UX/UI Designer (Figma)', salary: '$800–$1,400', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: '' },
            { title: 'Risk & Compliance Engineer', salary: '$1,000–$1,800', location: 'Quận 1, TP. HCM', type: 'fulltime', exp: '2–4 năm', badge: 'new' }
        ],
        employeeReviews: [
            { name: 'Lê Q.M.', role: 'Senior Engineer · 2 năm', rating: 5, text: 'Làm việc ở MoMo là trải nghiệm startup thực sự — bạn own feature từ đầu đến cuối và thấy impact trực tiếp lên hàng triệu users. ESOP là điểm cộng rất lớn.', pros: 'Impact thực, ESOP hấp dẫn, đồng nghiệp tài năng.', cons: 'Pace khá cao, cần adapt nhanh với business requirements.', date: 'Tháng 5, 2026', avatar: 'L', color: '#E11D48' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 7,
        name: 'Shopee Vietnam',
        type: 'E-commerce',
        sector: 'Bán lẻ / FMCG',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124966.png',
        rating: 4.1,
        reviews: 3200,
        location: 'Quận 4, TP. HCM',
        city: 'TP. HCM',
        size: '5000+ nhân sự',
        companyType: 'MNC',
        tags: ['NodeJS', 'React', 'AWS'],
        badge: 'top',
        jobs: 64,
        founded: '2015',
        posted: '2 ngày trước',
        website: 'careers.shopee.vn',
        about: [
            'Shopee là nền tảng thương mại điện tử hàng đầu Đông Nam Á và Đài Loan, kết nối hàng chục triệu người mua và người bán mỗi ngày.',
            'Shopee Vietnam là một trong những engineering hub lớn nhất của Sea Group tại SEA, chịu trách nhiệm phát triển các tính năng cốt lõi cho toàn khu vực.',
            'Chúng tôi xây dựng hệ thống phân tán quy mô cực lớn, xử lý hàng trăm triệu giao dịch trong các sự kiện big sale như 9.9, 11.11, 12.12.'
        ],
        benefits: [
            { title: 'Lương + RSU (Sea Group)', desc: 'Restricted Stock Units từ Sea Group niêm yết trên NYSE.' },
            { title: 'Bảo hiểm quốc tế Cigna', desc: 'Bảo hiểm sức khoẻ toàn diện cho nhân viên và gia đình.' },
            { title: 'Canteen nội bộ miễn phí', desc: 'Bữa trưa và đồ ăn nhẹ miễn phí tại văn phòng.' },
            { title: 'Shopee Coins hàng tháng', desc: 'Credit mua sắm trên Shopee mỗi tháng.' },
            { title: 'Gym & yoga tại văn phòng', desc: 'Phòng gym và lớp yoga nội bộ miễn phí.' }
        ],
        cultureTags: ['High Performance', 'Data-driven', 'Fast-paced', 'Global Scale', 'Ownership', 'Diversity'],
        openJobs: [
            { title: 'Senior NodeJS Engineer', salary: '$1,800–$3,000', location: 'Quận 4, TP. HCM', type: 'hybrid', exp: '4–6 năm', badge: 'hot' },
            { title: 'React Frontend Engineer', salary: '$1,500–$2,500', location: 'Quận 4, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: '' },
            { title: 'AWS Cloud Engineer', salary: '$2,000–$3,500', location: 'Quận 4, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: 'top' },
            { title: 'ML Engineer (Recommendation)', salary: '$2,500–$4,000', location: 'Quận 4, TP. HCM', type: 'hybrid', exp: '3–6 năm', badge: 'new' },
            { title: 'Product Manager (Marketplace)', salary: '$2,000–$3,500', location: 'Quận 4, TP. HCM', type: 'fulltime', exp: '4–6 năm', badge: '' }
        ],
        employeeReviews: [
            { name: 'Trần H.P.', role: 'Backend Engineer · 3 năm', rating: 4, text: 'Scale ở Shopee là một thứ gì đó rất khác biệt — bạn phải giải quyết những bài toán mà chỉ một số ít công ty trên thế giới phải đối mặt. RSU từ Sea Group là compensation package rất attractive.', pros: 'Bài toán technical khủng, RSU hấp dẫn, cơ sở vật chất tuyệt vời.', cons: 'Workload cao đặc biệt vào các đợt sale lớn, cần on-call rotation.', date: 'Tháng 4, 2026', avatar: 'T', color: '#EF4444' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 8,
        name: 'Tiki Corporation',
        type: 'E-commerce',
        sector: 'Bán lẻ / FMCG',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
        rating: 4.0,
        reviews: 980,
        location: 'Quận 3, TP. HCM',
        city: 'TP. HCM',
        size: '1000+ nhân sự',
        companyType: 'Startup',
        tags: ['React Native', 'TypeScript', 'Redux'],
        badge: 'new',
        jobs: 21,
        founded: '2010',
        posted: '5 ngày trước',
        website: 'tiki.vn',
        about: [
            'Tiki là sàn thương mại điện tử được người Việt tin yêu với cam kết giao hàng nhanh 2 tiếng tại các thành phố lớn và 100% hàng chính hãng.',
            'Với mô hình 1P (bán hàng trực tiếp) kết hợp 3P (marketplace), Tiki đang xây dựng hệ sinh thái dịch vụ toàn diện từ logistics, tài chính đến nội dung.',
            'Chúng tôi tìm kiếm những người có tinh thần Vietnam pride — muốn xây dựng một công ty công nghệ thuần Việt đẳng cấp thế giới.'
        ],
        benefits: [
            { title: 'Lương cạnh tranh + cổ phần', desc: 'Stock options với tiềm năng tăng trưởng cao.' },
            { title: 'Bảo hiểm sức khoẻ', desc: 'Bảo hiểm Bảo Việt cho bản thân.' },
            { title: 'Tiki voucher hàng tháng', desc: 'Voucher mua sắm trên Tiki mỗi tháng.' },
            { title: 'Team building hàng quý', desc: 'Hoạt động gắn kết team và sự kiện công ty.' }
        ],
        cultureTags: ['Vietnam Pride', 'Customer-first', 'Move Fast', 'Ownership', 'Transparent'],
        openJobs: [
            { title: 'React Native Developer', salary: '$1,000–$1,800', location: 'Quận 3, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: 'hot' },
            { title: 'TypeScript / Node.js Engineer', salary: '$1,200–$2,000', location: 'Quận 3, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: 'new' },
            { title: 'Redux / State Management Specialist', salary: '$1,000–$1,700', location: 'Quận 3, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: '' }
        ],
        employeeReviews: [
            { name: 'Phùng T.A.', role: 'Mobile Developer · 1.5 năm', rating: 4, text: 'Stack React Native của Tiki có độ phức tạp cao và nhiều bài toán thú vị về performance. Văn hoá open và ít bureaucracy, dễ đề xuất cải tiến.', pros: 'Flat culture, bài toán mobile thú vị, đồng nghiệp trẻ năng động.', cons: 'Áp lực feature delivery khá lớn, thỉnh thoảng thiếu tài liệu kỹ thuật.', date: 'Tháng 3, 2026', avatar: 'P', color: '#0284C7' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 9,
        name: 'VNG Corporation',
        type: 'Công nghệ / Gaming',
        sector: 'Gaming / IT',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png',
        rating: 4.4,
        reviews: 1540,
        location: 'Quận 10, TP. HCM',
        city: 'TP. HCM',
        size: '1000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['Golang', 'Flutter', 'Kafka'],
        badge: null,
        jobs: 55,
        founded: '2004',
        posted: '3 ngày trước',
        website: 'vng.com.vn',
        about: [
            'VNG Corporation là công ty internet và game hàng đầu Việt Nam, sở hữu các sản phẩm nổi tiếng như Zalo, ZaloPay, Zing MP3 và nhiều tựa game đình đám.',
            'Với hơn 20 năm phát triển, VNG là unicorn công nghệ đầu tiên của Việt Nam và đang hướng tới mục tiêu niêm yết quốc tế.',
            'Engineering team VNG xây dựng các hệ thống messaging phục vụ hàng triệu concurrent users, đặt ra những thách thức kỹ thuật ở tầm cỡ quốc tế.'
        ],
        benefits: [
            { title: 'Lương cạnh tranh + thưởng', desc: 'Gói compensation hàng đầu ngành game/tech Việt Nam.' },
            { title: 'Cổ phần công ty', desc: 'Stock options với tiềm năng khi VNG IPO.' },
            { title: 'Canteen và đồ ăn miễn phí', desc: 'Bữa trưa và đồ ăn nhẹ tại văn phòng VNG Campus.' },
            { title: 'Gym & game room', desc: 'Phòng gym, phòng game và khu thư giãn tại campus.' },
            { title: 'Vé game miễn phí', desc: 'Tài khoản premium các game VNG phát hành.' }
        ],
        cultureTags: ['Gaming Culture', 'Engineering Scale', 'Vietnam Unicorn', 'Fast-paced', 'Innovation', 'Fun'],
        openJobs: [
            { title: 'Senior Golang Engineer (Zalo)', salary: '$1,500–$2,800', location: 'Quận 10, TP. HCM', type: 'hybrid', exp: '3–6 năm', badge: 'hot' },
            { title: 'Flutter Mobile Developer', salary: '$1,000–$1,800', location: 'Quận 10, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: '' },
            { title: 'Kafka / Data Platform Engineer', salary: '$1,500–$2,500', location: 'Quận 10, TP. HCM', type: 'fulltime', exp: '3–5 năm', badge: 'new' },
            { title: 'Game Backend Developer (C++)', salary: '$1,200–$2,200', location: 'Quận 10, TP. HCM', type: 'fulltime', exp: '2–4 năm', badge: '' }
        ],
        employeeReviews: [
            { name: 'Cao V.H.', role: 'Backend Engineer (Zalo) · 3 năm', rating: 4, text: 'Hệ thống Zalo là một trong những bài toán distributed messaging thú vị nhất ở VN. Được làm việc trên codebase Go với scale hàng chục triệu users là trải nghiệm rất đáng giá.', pros: 'Bài toán scale thú vị, campus đẹp, văn hoá gaming vui.', cons: 'Một số dự án legacy cần refactor, quy trình đôi khi chậm.', date: 'Tháng 4, 2026', avatar: 'C', color: '#7C3AED' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 10,
        name: 'KMS Technology',
        type: 'Outsourcing / SaaS',
        sector: 'IT – Phần mềm',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732228.png',
        rating: 4.7,
        reviews: 430,
        location: 'Tân Bình, TP. HCM',
        city: 'TP. HCM',
        size: '200–500 nhân sự',
        companyType: 'Nước ngoài',
        tags: ['Angular', 'NodeJS', 'QA'],
        badge: null,
        jobs: 19,
        founded: '2009',
        posted: '4 ngày trước',
        website: 'kms-technology.com',
        about: [
            'KMS Technology là công ty phần mềm Mỹ-Việt chuyên về outsourcing và xây dựng SaaS products cho thị trường Bắc Mỹ, với văn phòng chính tại Atlanta, USA và trung tâm phát triển tại TP. HCM.',
            'Chúng tôi nổi tiếng với chất lượng engineering cao, quy trình agile trưởng thành và văn hoá làm việc với nhiều yếu tố Mỹ — thẳng thắn, tôn trọng và kết quả là trên hết.',
            'KMS Healthcare và KMS Solutions là hai mảng sản phẩm đang phát triển mạnh, mở ra nhiều cơ hội cho kỹ sư muốn chuyển từ outsourcing sang product development.'
        ],
        benefits: [
            { title: 'Lương USD + thưởng', desc: 'Gói lương theo benchmark Mỹ-Việt, review hàng năm.' },
            { title: 'Bảo hiểm sức khoẻ cao cấp', desc: 'Bảo hiểm Bảo Việt Premium cho bản thân và gia đình.' },
            { title: 'Flexible & hybrid', desc: 'WFH 2–3 ngày/tuần, giờ linh hoạt.' },
            { title: 'Ngân sách đào tạo $500/năm', desc: 'Certification, khoá học, conference trong và ngoài nước.' },
            { title: 'Cơ hội onsite Mỹ', desc: 'Short-term và long-term onsite tại Atlanta office.' }
        ],
        cultureTags: ['Engineering Quality', 'US Culture', 'Work-Life Balance', 'Transparency', 'Product-minded'],
        openJobs: [
            { title: 'Angular Senior Developer', salary: '$1,200–$2,000', location: 'Tân Bình, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: '' },
            { title: 'NodeJS Backend Engineer', salary: '$1,000–$1,800', location: 'Tân Bình, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: 'new' },
            { title: 'QA Automation Engineer (Playwright)', salary: '$800–$1,400', location: 'Tân Bình, TP. HCM', type: 'fulltime', exp: '2–4 năm', badge: '' }
        ],
        employeeReviews: [
            { name: 'Bùi T.T.', role: 'Senior QA Engineer · 3 năm', rating: 5, text: 'KMS là nơi hiếm có — outsourcing nhưng văn hoá như product company. WLB thực sự tốt, không OT vô lý. Management rất open và engineer được respect.', pros: 'WLB tuyệt vời, văn hoá Mỹ thẳng thắn, lương ổn định.', cons: 'Scale không bằng các big tech, ít bài toán distributed systems.', date: 'Tháng 5, 2026', avatar: 'B', color: '#0891B2' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    },
    {
        id: 11,
        name: 'VPBank Digital',
        type: 'Ngân hàng số',
        sector: 'Tài chính / Ngân hàng',
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        rating: 4.3,
        reviews: 760,
        location: 'Ba Đình, Hà Nội',
        city: 'Hà Nội',
        size: '1000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['ReactJS', 'Java', 'Agile'],
        badge: 'urgent',
        jobs: 39,
        founded: '1993',
        posted: 'Hôm nay',
        website: 'vpbank.com.vn',
        about: [
            'VPBank Digital là bộ phận công nghệ số của VPBank — ngân hàng TMCP tư nhân lớn thứ 2 Việt Nam với hơn 15 triệu khách hàng.',
            'Chúng tôi đang xây dựng nền tảng ngân hàng số thế hệ mới, từ mobile banking, open banking API đến các sản phẩm fintech embedded trong hệ sinh thái VPBank.',
            'VPBank Digital vận hành như một tech company trong ngân hàng: agile, data-driven và liên tục đổi mới để cạnh tranh với các neobank và fintech.'
        ],
        benefits: [
            { title: 'Lương cạnh tranh ngành ngân hàng', desc: 'Top-tier compensation trong hệ thống ngân hàng Việt Nam.' },
            { title: 'Thưởng KPI + thưởng Tết lớn', desc: 'Thưởng cuối năm tương đương 3–6 tháng lương.' },
            { title: 'Vay ưu đãi nhân viên', desc: 'Lãi suất ưu đãi cho vay nhà, xe, tiêu dùng.' },
            { title: 'Bảo hiểm cao cấp', desc: 'Bảo hiểm sức khoẻ Bảo Việt Gold cho toàn gia đình.' },
            { title: 'Đào tạo chứng chỉ tài chính', desc: 'Hỗ trợ thi CFA, FRM, PMP, AWS...' }
        ],
        cultureTags: ['Banking Innovation', 'Agile', 'Data-driven', 'Stability', 'Growth', 'Professional'],
        openJobs: [
            { title: 'Senior ReactJS Developer (Banking App)', salary: '30–50 triệu', location: 'Ba Đình, HN', type: 'hybrid', exp: '3–5 năm', badge: 'urgent' },
            { title: 'Java Backend Engineer (Core Banking)', salary: '28–45 triệu', location: 'Ba Đình, HN', type: 'fulltime', exp: '3–5 năm', badge: 'urgent' },
            { title: 'Agile Coach / Scrum Master', salary: '35–55 triệu', location: 'Ba Đình, HN', type: 'fulltime', exp: '4–6 năm', badge: '' },
            { title: 'Open Banking API Developer', salary: '32–52 triệu', location: 'Hà Nội', type: 'hybrid', exp: '3–5 năm', badge: 'new' }
        ],
        employeeReviews: [
            { name: 'Ngô M.H.', role: 'Backend Engineer · 2 năm', rating: 4, text: 'Bài toán core banking rất phức tạp và thú vị về mặt kỹ thuật. Môi trường chuyên nghiệp, quy trình agile thực sự được apply chứ không chỉ là hình thức.', pros: 'Stable, lương ổn, bài toán banking phức tạp thú vị.', cons: 'Compliance và security requirements đôi khi làm chậm delivery.', date: 'Tháng 4, 2026', avatar: 'N', color: '#1D4ED8' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=75',
            'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=75',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=75',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=75',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=75',
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=75'
        ]
    },
    {
        id: 12,
        name: 'Garena Vietnam',
        type: 'Gaming / Entertainment',
        sector: 'Gaming',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png',
        rating: 4.2,
        reviews: 590,
        location: 'Quận 1, TP. HCM',
        city: 'TP. HCM',
        size: '500–1000 nhân sự',
        companyType: 'MNC',
        tags: ['JavaScript', 'WebGL', 'Three.js'],
        badge: 'hot',
        jobs: 12,
        founded: '2009',
        posted: 'Hôm nay',
        website: 'garena.vn',
        about: [
            'Garena Vietnam là đơn vị phát hành game hàng đầu Đông Nam Á, thuộc tập đoàn Sea Group (NYSE: SE), chuyên phát hành và vận hành các tựa game đình đám như Free Fire, Liên Quân Mobile và nhiều tựa game PC.',
            'Với hơn 10 năm hoạt động tại Việt Nam, Garena xây dựng một đội ngũ kỹ thuật mạnh chuyên về web game, mobile game và các nền tảng gaming infrastructure.',
            'Chúng tôi tin rằng gaming không chỉ là giải trí mà còn là nơi kết nối cộng đồng, và mỗi kỹ sư ở Garena đều đóng góp vào việc tạo ra những trải nghiệm đáng nhớ cho hàng triệu game thủ.'
        ],
        benefits: [
            { title: 'Lương + RSU Sea Group', desc: 'Cổ phần Sea Group niêm yết NYSE — tiềm năng tăng trưởng lớn.' },
            { title: 'Bảo hiểm sức khoẻ Cigna', desc: 'Bảo hiểm quốc tế toàn diện cho bản thân và gia đình.' },
            { title: 'Game allowance hàng tháng', desc: 'Credit chơi game và mua skin trong các tựa game Garena.' },
            { title: 'Flexible working', desc: 'Hybrid model với core hours linh hoạt.' },
            { title: 'Gaming setup xịn', desc: 'PC gaming + gaming chair + peripherals cao cấp.' }
        ],
        cultureTags: ['Gaming Culture', 'Global Company', 'Creative', 'RSU', 'Work Hard Play Hard', 'Diverse'],
        openJobs: [
            { title: 'WebGL / Three.js Graphics Engineer', salary: '$1,500–$2,500', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '3–5 năm', badge: 'hot' },
            { title: 'JavaScript Game Developer', salary: '$1,200–$2,000', location: 'Quận 1, TP. HCM', type: 'hybrid', exp: '2–4 năm', badge: 'hot' },
            { title: 'Game Backend Engineer (Go / Python)', salary: '$1,500–$2,500', location: 'Quận 1, TP. HCM', type: 'fulltime', exp: '3–5 năm', badge: '' }
        ],
        employeeReviews: [
            { name: 'Vương T.K.', role: 'Frontend Game Developer · 2 năm', rating: 4, text: 'Làm việc với WebGL và Three.js để xây dựng các tính năng game là trải nghiệm cực kỳ thú vị — hiếm có nơi nào ở VN cho bạn làm thứ này ở production scale.', pros: 'Tech stack game thú vị, RSU từ Sea Group, văn hoá gaming vui.', cons: 'Deadline release game đôi khi khá gắt, cần crunch trước launch.', date: 'Tháng 5, 2026', avatar: 'V', color: '#F97316' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=75',
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=75',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=75',
            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=75',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=75'
        ]
    }
];

/* ═══════════════════════════════════════════════════════════════
   NAVIGATE TO DETAIL — lưu company vào sessionStorage rồi redirect
   ═══════════════════════════════════════════════════════════════ */
function openCompany(id) {
    const company = COMPANIES.find(c => c.id === id);
    if (company) {
        sessionStorage.setItem('selectedCompany', JSON.stringify(company));
    }
    window.location.href = `../ChiTietCongTy/CompanyDetail.html?id=${id}`;
}

/* ═══════════════════════════════════════════════════════════════
   STATE
   ═══════════════════════════════════════════════════════════════ */
const PER_PAGE = 8;
let currentPage = 1;
let currentCompanies = [...COMPANIES];

/* ── HELPERS ── */
function starsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += '<i class="ti ti-star-filled"></i>';
        } else if (i - rating < 1) {
            html += '<i class="ti ti-star-half-filled"></i>';
        } else {
            html += '<i class="ti ti-star"></i>';
        }
    }
    return html;
}

function badgesHTML(company) {
    let b = '';
    if (company.badge === 'top')    b += '<span class="badge badge-top">⭐ TOP NTD</span>';
    if (company.badge === 'hot')    b += '<span class="badge badge-hot">🔥 HOT</span>';
    if (company.badge === 'new')    b += '<span class="badge badge-new">✨ Mới</span>';
    if (company.badge === 'urgent') b += '<span class="badge badge-urgent">⚡ Gấp</span>';
    return b;
}

function cardClass(company) {
    const map = { top: 'is-top', hot: 'is-hot', new: 'is-new', urgent: 'is-urgent' };
    return map[company.badge] || '';
}

/* ── RENDER ── */
function renderCompanies() {
    const grid = document.getElementById('companiesGrid');
    const start = (currentPage - 1) * PER_PAGE;
    const slice = currentCompanies.slice(start, start + PER_PAGE);

    grid.innerHTML = slice.map(c => `
    <div class="company-card ${cardClass(c)}" onclick="openCompany(${c.id})">

      <div class="card-strip">
        <div class="card-badges">${badgesHTML(c)}</div>
        <span style="font-size:10px;color:var(--gray-400)">${c.posted}</span>
      </div>

      <div class="card-main">
        <div class="company-logo">
          <img src="${c.logo}" alt="${c.name}" loading="lazy"/>
        </div>
        <div class="card-info">
          <div class="company-name">${c.name}</div>
          <div class="company-type">${c.type} · ${c.sector}</div>
          <div class="company-rating">
            <span class="rating-val">${c.rating}</span>
            <div class="stars">${starsHTML(c.rating)}</div>
            <span class="review-count">(${c.reviews.toLocaleString()} đánh giá)</span>
          </div>
        </div>
      </div>

      <div class="card-meta">
        <div class="meta-item"><i class="ti ti-map-pin"></i><span>${c.location}</span></div>
        <div class="meta-item"><i class="ti ti-users"></i><span>${c.size}</span></div>
        <div class="meta-item"><i class="ti ti-building"></i><span>${c.companyType}</span></div>
        <div class="meta-item"><i class="ti ti-calendar"></i><span>Từ năm ${c.founded}</span></div>
      </div>

      <div class="card-divider"></div>

      <div class="card-tags">
        ${c.tags.map((t, i) => `<span class="card-tag ${i === 0 ? 'hl' : ''}">${t}</span>`).join('')}
      </div>

      <div class="card-footer">
        <span class="jobs-open">
          <i class="ti ti-briefcase"></i>${c.jobs} việc làm đang tuyển
        </span>
        <button class="view-btn-company" onclick="event.stopPropagation(); openCompany(${c.id})">
          Xem công ty <i class="ti ti-arrow-right"></i>
        </button>
      </div>

    </div>`).join('');

    renderPagination();
}

function renderPagination() {
    const total = Math.ceil(currentCompanies.length / PER_PAGE);
    const pg = document.getElementById('pagination');
    if (total <= 1) { pg.innerHTML = ''; return; }

    let html = `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="ti ti-chevron-left"></i></button>`;

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || Math.abs(i - currentPage) <= 1)
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
        else if (Math.abs(i - currentPage) === 2)
            html += `<span class="page-dots">…</span>`;
    }

    html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}>
        <i class="ti ti-chevron-right"></i></button>`;
    pg.innerHTML = html;
}

/* ── ACTIONS ── */
function goPage(p) {
    const total = Math.ceil(currentCompanies.length / PER_PAGE);
    if (p < 1 || p > total) return;
    currentPage = p;
    renderCompanies();
    document.querySelector('.results-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sortCompanies(v) {
    if (v === 'rating') {
        currentCompanies = [...currentCompanies].sort((a, b) => b.rating - a.rating);
    } else if (v === 'jobs') {
        currentCompanies = [...currentCompanies].sort((a, b) => b.jobs - a.jobs);
    } else if (v === 'newest') {
        currentCompanies = [...currentCompanies].sort((a, b) => b.id - a.id);
    } else {
        currentCompanies = [...COMPANIES];
    }
    currentPage = 1;
    renderCompanies();
}

function setView(v) {
    const grid = document.getElementById('companiesGrid');
    document.getElementById('btnGrid').classList.toggle('active', v === 'grid');
    document.getElementById('btnList').classList.toggle('active', v === 'list');
    grid.classList.toggle('list-view', v === 'list');
}

function quickSearch(kw) {
    document.getElementById('searchInput').value = kw;
    doSearch();
}

function doSearch() {
    const kw = document.getElementById('searchInput').value.toLowerCase().trim();
    currentCompanies = kw
        ? COMPANIES.filter(c =>
            c.name.toLowerCase().includes(kw) ||
            c.sector.toLowerCase().includes(kw) ||
            c.type.toLowerCase().includes(kw) ||
            c.tags.some(t => t.toLowerCase().includes(kw))
          )
        : [...COMPANIES];
    document.getElementById('totalCount').textContent = currentCompanies.length.toLocaleString();
    currentPage = 1;
    renderCompanies();
}

function filterByLocation(loc) {
    currentCompanies = loc
        ? COMPANIES.filter(c => c.location.includes(loc))
        : [...COMPANIES];
    document.getElementById('totalCount').textContent = currentCompanies.length.toLocaleString();
    currentPage = 1;
    renderCompanies();
}

function resetGroup(id) {
    document.querySelectorAll(`#${id} input`).forEach(cb => cb.checked = false);
}

function resetSize() {
    document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
}

function resetAll() {
    document.querySelectorAll('.sidebar-scroll input[type="checkbox"]').forEach(cb => cb.checked = false);
    resetSize();
    document.querySelector('.loc-select').value = '';
    currentCompanies = [...COMPANIES];
    document.getElementById('totalCount').textContent = currentCompanies.length.toLocaleString();
    currentPage = 1;
    renderCompanies();
}

function toggleSize(el) {
    el.classList.toggle('active');
}

function toggleMore(btn) {
    const group = btn.closest('.filter-group');
    const hiddenItems = group.querySelectorAll('.filter-more.hidden');
    const visibleMore = group.querySelectorAll('.filter-more:not(.hidden)');

    if (hiddenItems.length > 0) {
        hiddenItems.forEach(el => el.classList.remove('hidden'));
        btn.textContent = 'Thu gọn ↑';
    } else {
        visibleMore.forEach(el => el.classList.add('hidden'));
        btn.textContent = 'Xem thêm +';
    }
}

/* ── INIT ── */
renderCompanies();