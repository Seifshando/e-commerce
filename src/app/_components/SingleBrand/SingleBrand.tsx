import {
Card,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { BrandType } from "@/types/brand.type"
import { motion } from "framer-motion"

type Props = {
currentBrand: BrandType
}

export default function SingleBrand({ currentBrand }: Props) {
return (
<motion.div
    key={currentBrand._id}
    className="w-1/5 p-4"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
>
    <Card className="p-3 group/parent shadow-md hover:shadow-lg transition-all duration-300">
    <Link href={`/brands/${currentBrand._id}`}>
        <CardHeader>
        <Image
            src={currentBrand.image}
            alt={`image of ${currentBrand.name}`}
            width={500}
            height={500}
        />
        <CardTitle className="text-green-600">
            {currentBrand.name}
        </CardTitle>
        </CardHeader>
    </Link>
    </Card>
</motion.div>
)
}
