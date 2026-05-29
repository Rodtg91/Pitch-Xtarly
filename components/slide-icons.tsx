import {
	AppWindow,
	Award,
	BarChart2,
	Bell,
	CheckCircle,
	Coins,
	CreditCard,
	Crown,
	Gift,
	Heart,
	QrCode,
	RotateCcw,
	ScanLine,
	Smartphone,
	Sparkles,
	Star,
	Tag,
	Target,
	Ticket,
	TrendingDown,
	Trophy,
	UserX,
	Wallet,
	Zap,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

export const SLIDE_ICON_MAP: Record<string, IconComponent> = {
	// Programas
	Tag,
	Coins,
	Crown,
	Ticket,
	Award,
	// Apps
	CreditCard,
	Wallet,
	Smartphone,
	AppWindow,
	Star,
	Sparkles,
	Trophy,
	// Problema
	UserX,
	TrendingDown,
	BarChart2,
	Target,
	// Journey / How it works
	QrCode,
	ScanLine,
	CheckCircle,
	Bell,
	Gift,
	Heart,
	RotateCcw,
	Zap,
};

interface SlideIconProps extends LucideProps {
	name: string;
	fallback?: string;
}

export function SlideIcon({ name, fallback, ...props }: SlideIconProps) {
	const Icon = SLIDE_ICON_MAP[name];
	if (Icon) return <Icon {...props} />;
	if (fallback) return <span style={{ fontSize: props.size ? `${props.size}px` : "1.25rem", lineHeight: 1 }}>{fallback}</span>;
	return null;
}
