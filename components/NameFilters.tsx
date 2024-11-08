import { Ionicons } from "@expo/vector-icons";
import {
  XStack,
  YStack,
  Button,
  Checkbox,
  Label,
  styled,
  Popover,
  ScrollView,
  View,
  Text,
  Stack,
} from "tamagui";
import { Gender } from "../models/types";

const FilterButton = styled(Button, {
  backgroundColor: "$gray3",
  borderRadius: 8,
  paddingHorizontal: 12,
  height: 36,
  variants: {
    active: {
      true: {
        backgroundColor: "$gray5",
      },
    },
  },
});

const FilterLabel = styled(Label, {
  color: "$gray11",
  fontSize: 14,
});

const PopoverContent = styled(Popover.Content, {
  backgroundColor: "$background",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "$gray5",
  maxHeight: 300,
  width: 150,
});

const OptionContainer = styled(XStack, {
  paddingVertical: 8,
  paddingHorizontal: 12,
  gap: "$2",
  alignItems: "center",
  hoverStyle: {
    backgroundColor: "$gray3",
  },
  pressStyle: {
    backgroundColor: "$gray4",
  },
});

const StyledText = styled(Text, {
  color: "$gray11",
  marginBottom: "$2",
});

const CheckIcon = () => (
  <Ionicons name="checkmark" size={14} color="var(--color)" />
);

type FilterProps = {
  selectedOrigins: string[];
  setSelectedOrigins: (origins: string[]) => void;
  selectedReligions: string[];
  setSelectedReligions: (religions: string[]) => void;
  selectedGenders: Gender[];
  setSelectedGenders: (genders: Gender[]) => void;
  origins: string[];
  religions: string[];
};

export function NameFilters({
  selectedOrigins,
  setSelectedOrigins,
  selectedReligions,
  setSelectedReligions,
  selectedGenders,
  setSelectedGenders,
  origins,
  religions,
}: FilterProps) {
  return (
    <Stack>
      <StyledText>Filters</StyledText>
      <XStack gap="$2" marginVertical="$3" flexWrap="wrap">
        <FilterPopover
          title="Origins"
          selected={selectedOrigins}
          options={origins}
          onSelect={setSelectedOrigins}
        />
        <FilterPopover
          title="Religions"
          selected={selectedReligions}
          options={religions}
          onSelect={setSelectedReligions}
        />
        <FilterPopover
          title="Genders"
          selected={selectedGenders as string[]}
          options={["male", "female", "unisex"]}
          onSelect={(values) => setSelectedGenders(values as Gender[])}
        />
      </XStack>
    </Stack>
  );
}

type FilterPopoverProps = {
  title: string;
  selected: string[];
  options: string[];
  onSelect: (values: string[]) => void;
};

function FilterPopover({
  title,
  selected,
  options,
  onSelect,
}: FilterPopoverProps) {
  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((item) => item !== option));
    } else {
      onSelect([...selected, option]);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    onSelect(checked ? options : []);
  };

  const isAllSelected = options.length === selected.length;

  return (
    <Popover placement="bottom">
      <Popover.Trigger asChild>
        <FilterButton active={selected.length > 0}>
          <XStack gap="$2" alignItems="center" justifyContent="center">
            <Label>{title}</Label>
            {selected.length > 0 && (
              <Label color="$gray11">({selected.length})</Label>
            )}
            <Ionicons name="chevron-down" size={16} color="var(--gray11)" />
          </XStack>
        </FilterButton>
      </Popover.Trigger>

      <PopoverContent>
        <ScrollView>
          <YStack padding="$2">
            <OptionContainer onPress={() => handleSelectAll(!isAllSelected)}>
              <Checkbox
                id="all"
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                size="$3"
              >
                <Checkbox.Indicator>
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox>
              <FilterLabel htmlFor="all">All</FilterLabel>
            </OptionContainer>

            {options.map((option) => (
              <OptionContainer
                key={option}
                onPress={() => handleSelect(option)}
              >
                <Checkbox
                  id={option}
                  checked={selected.includes(option)}
                  onCheckedChange={() => handleSelect(option)}
                  size="$3"
                >
                  <Checkbox.Indicator>
                    <CheckIcon />
                  </Checkbox.Indicator>
                </Checkbox>
                <FilterLabel htmlFor={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </FilterLabel>
              </OptionContainer>
            ))}
          </YStack>
        </ScrollView>
      </PopoverContent>
    </Popover>
  );
}
