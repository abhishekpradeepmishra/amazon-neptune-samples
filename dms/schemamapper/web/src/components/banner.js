import Image from 'next/image'

export default function Banner() {
    return (
        <Image
            src="/public/images/kraken.jpg" // Route of the image file
            height={144} // Desired size with correct aspect ratio
            width={144} // Desired size with correct aspect ratio
            alt="Kraken"
        />)
}
