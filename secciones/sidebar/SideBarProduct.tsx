/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  ChevronDown,
  Smartphone,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import useFilterStore from "@/zustand/filtro-productos";
import { useProductStores } from "@/zustand/filtro-data";
import { useEffect } from "react";

const categories = [
  { id: "iphone", name: "iPhone", icon: Smartphone },
  { id: "ipad", name: "iPad", icon: Smartphone },
  { id: "macbook", name: "MacBook", icon: Smartphone },
  { id: "android", name: "Android", icon: Smartphone },
  { id: "accessories", name: "Accesorios", icon: Smartphone },
];

// Filter content component shared between desktop and mobile
function FilterContent({
  selectedCategory,
  setSelectedCategory,
  selectedModels,
  setSelectedModels,
  selectedColors,
  setSelectedColors,
  selectedMemory,
  setSelectedMemory,
}: {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  selectedModels: string[];
  setSelectedModels: (models: any) => void;
  selectedColors: any;
  setSelectedColors: (colors: any) => void;
  selectedMemory: any;
  setSelectedMemory: (memory: any) => void;

  onApplyFilters?: () => void;
}) {
  const setModel = useFilterStore((state: any) => state.setModel);
  const setColor = useFilterStore((state: any) => state.setColor);
  const setMemory = useFilterStore((state: any) => state.setMemory);
  const { sortOrder, setSortOrder } = useFilterStore();
  const setCategory = useFilterStore((state: any) => state.setCategory);
  const { models, colors, memories } = useProductStores();
  const colores = [
    { name: "Gris espacial", value: "#2C2C2E" },
    { name: "Plata", value: "#F2F2F7" },
    { name: "Dorado", value: "#D1B27A" },
    { name: "Rojo", value: "#FF3B30" },
    { name: "Azul", value: "#0061F2" },
    { name: "Verde", value: "#32D74B" },
    { name: "Púrpura", value: "#AF52DE" },
    { name: "Rosa", value: "#FF2D55" },
    { name: "Medianoche", value: "#1C1C1E" },
    { name: "Luz estelar", value: "#F8F1E9" },
    { name: "Titanio natural", value: "#E3DAC9" },
    { name: "Titanio azul", value: "#6F7DC1" },
    { name: "Titanio blanco", value: "#F2F2F7" },
    { name: "Titanio negro", value: "#3E3E42" },
  ];

  const coloresFiltrados = colores.filter((color) =>
    colors.includes(color.name)
  );

  console.log("Colores filtrados:", coloresFiltrados);

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
      setCategory(category);
      setSelectedModels([]);
    }
  };

  // Handle model selection

  const handleModelChange = (model: any) => {
    if (model === selectedModels) {
      setSelectedModels("");
      setModel("");
    }
    setSelectedModels([model]);
    setModel(model);
  };

  const sort = (sort: any) => {
    setSortOrder(sort);
  };
  // Handle color selection
  const handleColorChange = (color: any) => {
    if (color === selectedColors) {
      selectedColors("");
      setColor("");
    } else {
      setSelectedColors([color]);
      setColor(color);
    }
  };

  // Handle memory selection
  const handleMemoryChange = (memory: any) => {
    // Si la memoria seleccionada es la misma que la actual, lo desmarcamos
    if (memory === selectedMemory) {
      setSelectedMemory(""); // Desmarcar
      setMemory(""); // Limpiar el valor de memory en Zustand
    } else {
      setSelectedMemory([memory]); // Marcar el nuevo valor
      setMemory(memory); // Actualizar el valor de memory en Zustand
    }
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-2">Categorías</h3>
        <RadioGroup
          value={selectedCategory || ""}
          onValueChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Link href={`/productos/${category.id}`} passHref>
                <div role="link" className="flex">
                  <RadioGroupItem
                    value={category.id}
                    id={`category-${category.id}`}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex items-center"
                  >
                    <category.icon className="h-4 gap-2" />
                    <span className="">{category.name}</span>
                  </Label>
                </div>
              </Link>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Models - Only show if a category is selected */}
      {selectedCategory && (
        <div>
          <h3 className="font-medium mb-2">Modelos</h3>
          <div className="space-y-2">
            {/* Checkbox para la categoría "todos" */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`todos`}
                checked={selectedModels.includes("")}
                onCheckedChange={() => handleModelChange("")}
              />
              <Label htmlFor={`todos`}>Todos</Label>
            </div>

            {/* Mapeo de los modelos para la categoría seleccionada */}
            {models.map((model) => (
              <div key={model} className="flex items-center space-x-2">
                <Checkbox
                  id={`model-${model}`}
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() => handleModelChange(model)}
                />
                <Label htmlFor={`model-${model}`}>{model}</Label>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
        </div>
      )}

      {/* Colors */}
      {selectedCategory && selectedCategory !== "accessories" && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="colors">
            <AccordionTrigger className="py-2">Colores</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {/* Checkbox para la categoría "todos los colores" */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="todos-colores"
                    checked={selectedColors.includes("")}
                    onCheckedChange={() => handleColorChange("")}
                  />
                  <Label htmlFor="todos-colores">Todos los colores</Label>
                </div>

                {/* Mapeo de los colores filtrados */}
                {coloresFiltrados.map((color) => (
                  <div key={color.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.name}`}
                      checked={selectedColors.includes(color.name)}
                      onCheckedChange={() => handleColorChange(color.name)}
                    />
                    <Label
                      htmlFor={`color-${color.name}`}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: color.value, // Ahora accedemos correctamente al color
                          border:
                            color.name.toLowerCase() === "plata"
                              ? "1px solid #ccc"
                              : "none",
                        }}
                      />
                      {color.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Separator />

      {/* Memory */}
      {selectedCategory === "iphone" || selectedCategory === "ipad" ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="memory">
            <AccordionTrigger className="py-2">Memoria</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="todos-memorias"
                    checked={selectedMemory.includes("")}
                    onCheckedChange={() => handleMemoryChange("")}
                  />
                  <Label htmlFor="todos-memorias">Todas las memorias</Label>
                </div>
                {memories.map((memory) => (
                  <div key={memory} className="flex items-center space-x-2">
                    <Checkbox
                      id={`memory-${memory}`}
                      checked={selectedMemory.includes(memory)}
                      onCheckedChange={() => handleMemoryChange(memory)}
                    />
                    <Label htmlFor={`memory-${memory}`}>{memory}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}

      <Separator />

      {/* Price Sorting */}
      <div>
        <h3 className="font-medium mb-2">Ordenar por precio</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {sortOrder === "asc"
                ? "Precio: Menor a Mayor"
                : "Precio: Mayor a Menor"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem onClick={() => sort("des")}>
              <ArrowUpAZ className="mr-2 h-4 w-4" />
              <span>Precio: Menor a Mayor</span>
              {sortOrder === "asc" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sort("asc")}>
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              <span>Precio: Mayor a Menor</span>
              {sortOrder === "des" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function ProductFilterSidebar() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedModels, setSelectedModels] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedMemory, setSelectedMemory] = React.useState<string[]>([]);

  const [isOpen, setIsOpen] = React.useState(false);
  const { category } = useFilterStore(); // Obtener la categoría del store

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="rounded-full shadow-lg">
              <Smartphone className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] sm:w-[350px] overflow-y-auto"
          >
            <FilterContent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedModels={selectedModels}
              setSelectedModels={setSelectedModels}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedMemory={selectedMemory}
              setSelectedMemory={setSelectedMemory}
              onApplyFilters={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full overflow-y-auto pr-4">
        <FilterContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedMemory={selectedMemory}
          setSelectedMemory={setSelectedMemory}
        />
      </div>
    </>
  );
}
