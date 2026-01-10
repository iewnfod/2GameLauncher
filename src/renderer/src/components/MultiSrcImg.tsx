import React, { useCallback, useEffect, useState } from "react";

// @ts-ignore
interface MultiSourceImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string[];
	fallbackSrc?: string;
	placeholder?: React.ReactNode;
	retryDelay?: number;
	maxRetries?: number;
}

const checkedUrlsCache = new Set<string>();

export const MultiSrcImg: React.FC<MultiSourceImgProps> = ({
	src,
	fallbackSrc,
	placeholder,
	retryDelay = 0,
	maxRetries = 1,
	onError,
	onLoad,
	...props
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [retryCount, setRetryCount] = useState(0);
	const [imgSrc, setImgSrc] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);

	const tryNextSource = useCallback(() => {
		if (currentIndex < src.length - 1) {
			setCurrentIndex((prev) => prev + 1);
			setRetryCount(0);
			setIsLoading(true);
		} else if (fallbackSrc) {
			setImgSrc(fallbackSrc);
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [currentIndex, src.length, fallbackSrc]);

	const checkImageUrl = useCallback(async (url: string): Promise<boolean> => {
		if (checkedUrlsCache.has(url)) {
			return true;
		}

		try {
			const response = await fetch(url, { method: "HEAD" });
			if (
				response.ok &&
				response.headers.get("content-type")?.startsWith("image/")
			) {
				checkedUrlsCache.add(url);
				return true;
			}
		} catch (error) {}

		return false;
	}, []);

	useEffect(() => {
		const setupImage = async () => {
			if (!src.length) {
				if (fallbackSrc) {
					setImgSrc(fallbackSrc);
				}
				return;
			}

			for (let i = 0; i < src.length; i++) {
				const isValid = await checkImageUrl(src[i]);
				if (isValid) {
					setCurrentIndex(i);
					setImgSrc(src[i]);
					return;
				}
			}

			setImgSrc(src[0] || fallbackSrc || "");
		};

		setupImage();
	}, [src, fallbackSrc, checkImageUrl]);

	const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
		setIsLoading(false);
		checkedUrlsCache.add(imgSrc);
		onLoad?.(e);
	};

	const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
		if (retryCount < maxRetries) {
			setRetryCount((prev) => prev + 1);
			setTimeout(() => {
				setImgSrc((prev) => {
					return `${prev}${prev.includes("?") ? "&" : "?"}retry=${Date.now()}`;
				});
			}, retryDelay);
		} else {
			tryNextSource();
		}

		onError?.(e);
	};

	useEffect(() => {
		if (currentIndex < src.length) {
			setImgSrc(src[currentIndex]);
			setIsLoading(true);
		}
	}, [currentIndex, src]);

	if (!imgSrc) {
		return placeholder ? <>{placeholder}</> : null;
	}

	return (
		<div className="relative w-full h-full">
			{isLoading && placeholder && (
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				>
					{placeholder}
				</div>
			)}
			<img
				{...props}
				src={imgSrc}
				onLoad={handleLoad}
				onError={handleError}
				style={{
					...props.style,
					opacity: isLoading ? 0 : 1,
					transition: "opacity 0.15s ease",
				}}
			/>
		</div>
	);
};

export default MultiSrcImg;
