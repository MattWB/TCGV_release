import type { ComponentType } from "react";

type IconProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

export type ResponsiveImg = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

type Props = {
  image: ResponsiveImg;
  name: string;
  priceLabel: string;
  description: string;
  categoryIcon?: ComponentType<IconProps>;
  badge?: string;
};

export default function ProductCardReact({
  image,
  name,
  priceLabel,
  description,
  categoryIcon: CategoryIcon,
  badge,
}: Props) {
  return (
    <article className="card-premium group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-clubwhite">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          width={image.width}
          height={image.height}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 tcgv-img-overlay-ball"></div>

        {badge && (
          <div className="absolute left-3 top-3">
            <span className="tcgv-pill tcgv-pill--overlay-ball tcgv-pill--xs">
              {badge}
            </span>
          </div>
        )}

        {CategoryIcon && (
          <div className="absolute right-3 top-3">
            <span className="grid size-10 place-items-center rounded-full bg-ball">
              <CategoryIcon
                className="tcgv-icon size-6 text-clubblack"
                aria-hidden
              />
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6 text-left">
        <h3 className="relative text-lg font-semibold tracking-tight transition-colors">
          <span className="relative inline-block">
            {name}
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-ball transition-all duration-300 group-hover:w-full" />
          </span>
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <p className="mt-auto pt-4 text-xl font-semibold">{priceLabel}</p>
      </div>
    </article>
  );
}
