# CX-Builder - Professional Resume & Cover Letter Builder

![CX-Builder Logo](public/CX_logo.png)

CX-Builder is a modern, web-based application that empowers job seekers to create professional resumes and cover letters with ease. Built with React and featuring a sleek, intuitive interface, CX-Builder offers multiple professionally designed templates to help you stand out in today's competitive job market.

## 🚀 What is CX-Builder?

CX-Builder is your all-in-one solution for creating stunning resumes and cover letters. Whether you're a recent graduate, experienced professional, or career changer, our platform provides the tools you need to showcase your skills and experience effectively.

### Key Benefits:
- **Professional Templates**: Choose from 13+ carefully crafted templates
- **Real-time Preview**: See your changes instantly as you type
- **User-Friendly Interface**: Intuitive design that anyone can use
- **Local Storage**: Your data is saved automatically in your browser
- **History Tracking**: Keep track of all your created documents
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🎯 Who Should Use CX-Builder?

- **Job Seekers** looking to create professional resumes quickly
- **Students** preparing for internships or entry-level positions
- **Career Changers** needing to highlight transferable skills
- **Professionals** updating their resumes for new opportunities
- **Freelancers** creating multiple versions for different clients

## ✨ Features

### Resume Builder
- **Multiple Sections**: Personal info, experience, education, skills, projects, certifications, languages, volunteer work, and references
- **Dynamic Content Management**: Add, edit, or remove sections as needed
- **Professional Formatting**: Clean, ATS-friendly layouts
- **Template Variety**: From minimalist to creative designs

### Cover Letter Builder
- **Matching Templates**: Coordinate with your resume design
- **Customizable Content**: Tailor your message for each application
- **Professional Layouts**: Industry-standard formatting

### Template Collection
- **Modern**: Clean, contemporary design for tech and creative roles
- **Minimalist**: Simple, elegant layout focusing on content
- **Executive**: Professional design for senior-level positions
- **Creative**: Bold, artistic template for creative industries
- **Professional**: Classic, conservative design for traditional industries
- **Compact**: Space-efficient layout for extensive experience
- **Bold**: Eye-catching design with strong visual hierarchy
- **Elegant**: Sophisticated template with refined typography
- **Tech**: Developer-focused design with technical emphasis
- **Spectrum**: Colorful, modern template with visual appeal
- **Horizon**: Wide-format design with horizontal emphasis
- **Nexus**: Connected, network-inspired professional design
- **Prism**: Multi-faceted design showcasing diverse skills

## 🛠️ Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adam-254/CX-Builder.git
   cd CX-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using CX-Builder

## 📖 How to Use CX-Builder

### Creating Your First Resume

1. **Choose a Template**: Browse through our template gallery and select one that matches your style and industry
2. **Fill in Your Information**: Use the sidebar forms to input your personal details, work experience, education, and skills
3. **Preview in Real-time**: Watch your resume come to life in the preview panel as you type
4. **Customize Sections**: Add or remove sections based on your needs (projects, certifications, languages, etc.)
5. **Save Your Work**: Your progress is automatically saved to your browser's local storage
6. **Access History**: View and manage all your created resumes in the History page

### Creating a Cover Letter

1. **Select a Cover Letter Template**: Choose from templates that complement your resume design
2. **Personalize Your Content**: Fill in the recipient details and customize your message
3. **Match Your Resume**: Ensure consistent branding across your application materials
4. **Save and Manage**: Keep track of different cover letters for various applications

### Managing Your Documents

- **History Page**: Access all your previously created resumes and cover letters
- **Template Switching**: Change templates while preserving your content
- **Data Persistence**: Your information is saved locally and persists between sessions

## 🏗️ Project Structure

```
CX-Builder/
├── public/                 # Static assets
│   └── CX_logo.png        # Application logo
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Header.jsx     # Navigation header
│   │   ├── Sidebar.jsx    # Form sidebar
│   │   ├── Preview.jsx    # Document preview
│   │   ├── Modal.jsx      # Modal component
│   │   └── modals/        # Specific modal forms
│   ├── pages/             # Page components
│   │   ├── Builder.jsx    # Main builder interface
│   │   └── History.jsx    # Document history page
│   ├── templates/         # Document templates
│   │   ├── resume/        # Resume template components
│   │   └── cover-letter/  # Cover letter templates
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json          # Project dependencies
└── vite.config.js       # Vite configuration
```

## 🎨 Available Templates

### Resume Templates
- **Modern** - Contemporary design perfect for tech and startup environments
- **Minimalist** - Clean, distraction-free layout emphasizing content
- **Executive** - Sophisticated design for C-level and senior management roles
- **Creative** - Artistic template for designers, marketers, and creative professionals
- **Professional** - Traditional, corporate-friendly design
- **Compact** - Efficient use of space for extensive experience
- **Bold** - Strong visual impact with clear section divisions
- **Elegant** - Refined typography and subtle design elements
- **Tech** - Developer-focused with emphasis on technical skills
- **Spectrum** - Vibrant, modern design with color accents
- **Horizon** - Horizontal layout maximizing content visibility
- **Nexus** - Interconnected design showing relationship between skills
- **Prism** - Multi-dimensional layout highlighting diverse capabilities

### Cover Letter Templates
All resume templates have matching cover letter designs to ensure consistent branding across your application materials.

## 🔧 Technical Details

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with component-specific stylesheets
- **State Management**: React hooks and local storage
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 🚀 Future Enhancements

- PDF export functionality
- Cloud storage integration
- Template customization tools
- ATS optimization features
- Multi-language support
- Collaboration features
- Advanced formatting options

## 🤝 Contributing

We welcome contributions to CX-Builder! Whether it's bug fixes, new features, or template designs, your input helps make the platform better for everyone.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues or have questions about using CX-Builder, please:
- Open an issue on GitHub
- Check our documentation
- Contact the development team

## 🌟 Acknowledgments

- Thanks to all contributors who have helped shape CX-Builder
- Inspired by the need for accessible, professional resume building tools
- Built with modern web technologies for optimal performance and user experience

---

**Ready to build your professional future?** Start creating your standout resume and cover letter with CX-Builder today!