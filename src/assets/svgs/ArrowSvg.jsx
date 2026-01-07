

const ArrowSvg = ({rotated,strokeColor= '#1E0E06'}) => {
 
  return (
<svg 
  className={`transition-transform duration-300 ${
        rotated ? "rotate-180" : "rotate-0"
      }`}
width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.16851 8.63635C5.16851 8.63635 8.80955 13.6363 10.1123 13.6364C11.4152 13.6364 15.0562 8.63635 15.0562 8.63635" stroke={strokeColor} stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}

export default ArrowSvg


