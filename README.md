# KDB Performance - Kai Byrd's Athletic Performance Website

A modern, responsive website showcasing premium athletic performance products and personal basketball training services.

## 🏀 Features

### Pages
- **Homepage**: Welcome message, product overview, and call-to-action
- **Products**: Grid layout of athletic products with filtering capabilities
- **About**: Kai Byrd's background, experience, and training services
- **Contact**: Multiple contact methods with functional contact form

### Design Elements
- **Color Scheme**: Beautiful gradient blend of blue, white, purple, and green
- **Responsive Design**: Mobile-first approach with seamless UX/UI
- **Animations**: Smooth transitions, floating cards, and scroll effects
- **Typography**: Modern Inter font family for excellent readability

### Functionality
- **Product Filtering**: Interactive category filters on products page
- **Contact Form**: Functional mailto: configuration for easy communication
- **Mobile Navigation**: Responsive hamburger menu for mobile devices
- **Smooth Scrolling**: Enhanced user experience with smooth page navigation

## 🛠️ Technical Stack

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and form handling
- **No Frameworks**: Pure HTML/CSS/JS for optimal performance and GitHub Pages compatibility

## 📁 Project Structure

```
KaiSite/
├── index.html          # Homepage
├── products.html       # Products page with filtering
├── about.html          # About Kai Byrd and training services
├── contact.html        # Contact information and form
├── styles.css          # Complete stylesheet with responsive design
├── script.js           # Interactive functionality
└── README.md           # Project documentation
```

## 🚀 Deployment to GitHub Pages

### Quick Deploy
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Select source: Deploy from a branch → main
5. Your site will be live at: `https://yourusername.github.io/repositoryname`

### Detailed Steps
1. **Create Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: KDB Performance website"
   git branch -M main
   git remote add origin https://github.com/yourusername/kdb-performance.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Navigate to your repository on GitHub
   - Click on "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Custom Domain (Optional)**:
   - Add a CNAME file with your custom domain
   - Configure DNS settings with your domain provider

## 📧 Contact Configuration

The contact form uses `mailto:` links for simplicity and reliability:

- **General Inquiries**: info@kdbperformance.com
- **Training Sessions**: training@kdbperformance.com
- **Quick Questions**: hello@kdbperformance.com

*Note: Update these email addresses to actual working emails before deployment.*

## 🎨 Customization

### Colors
The site uses a carefully crafted gradient color scheme:
- **Primary Blue**: #667eea
- **Purple**: #764ba2
- **Green**: #56ab2f
- **Light Green**: #a8e6cf

### Content Updates
- **Products**: Edit the product cards in `products.html`
- **About Info**: Update Kai's biography in `about.html`
- **Contact Info**: Modify contact details in `contact.html`
- **Pricing**: Adjust training session pricing in `about.html`

### Amazon Store Links
Replace placeholder Amazon links (`https://amazon.com`) with actual product URLs:
```html
<a href="YOUR_ACTUAL_AMAZON_PRODUCT_URL" target="_blank" class="product-link">
```

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## ⚡ Performance Features

- **Optimized Images**: Uses emoji placeholders for fast loading
- **Minified CSS**: Production-ready stylesheet
- **Lazy Loading**: Intersection Observer for animations
- **Smooth Animations**: Hardware-accelerated transitions
- **SEO Friendly**: Semantic HTML and proper meta tags

## 🔧 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful fallbacks for older browsers

## 📈 Future Enhancements

Potential additions for future versions:
- Blog section for training tips
- Online booking system for training sessions
- Product reviews and testimonials
- Social media integration
- Analytics tracking
- Performance monitoring

## 🤝 Support

For technical support or questions about the website:
- Review the code comments in each file
- Check browser console for any JavaScript errors
- Ensure all files are in the correct directory structure
- Verify that email addresses are updated for production

## 📄 License

This website template is created for KDB Performance. Customize and deploy as needed for your athletic performance business.

---

**Built with ❤️ for peak athletic performance**
